require('dotenv').config();
const { readFile, writeFile, createWriteStream } = require('fs');
const { createGzip } = require('zlib');
const { resolve } = require('path');
const { SitemapAndIndexStream, SitemapStream, streamToPromise } = require('sitemap');
const { request } = require("graphql-request");
const moment = require('moment');
const xml2js = require('xml2js');

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

function addTodaySitemapToIndex() {
  readFile(resolve('./public/sitemap.xml'), "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    // convert xml to json
    xml2js.parseString(data, (err, result) => {
      if (err) {
        throw err;
      }

      const todaySitemap = {
        loc: [domain + "/sitemaps/sitemap-today.xml"]
      };

      result.sitemapindex.sitemap.push(todaySitemap);

      // convert JSON object to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // write updated XML string to a file
      writeFile(resolve('./public/sitemap.xml'), xml, (err) => {
        if (err) {
          throw err;
        }
        console.log("sitemaps: 3. sitemap-today.xml added to index");
        console.log("sitemaps: 4. DONE");
      });

    });


  });
}

const GET_ARTICLES_QUERY = `
query MyQuery($currentDay: timestamp = "",$tenant_code: String = "") {
  articles: swp_article(where: {published_at: {_is_null: false, _lte: $currentDay}, tenant_code: {_eq: $tenant_code}}, order_by: {published_at: asc}) {
    slug
    updated_at
    swp_route {
      staticprefix
    }
  }
}
`;

(async () => {
  console.log("sitemaps: 1. STARTED");
  const currentDay = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  const result = await request(api_url, GET_ARTICLES_QUERY, {
    tenant_code: tenant_code,
    currentDay: currentDay
  })

  try {
    const sms = new SitemapAndIndexStream({
      limit: 10000, // defaults to 45k
      // SitemapAndIndexStream will call this user provided function every time
      // it needs to create a new sitemap file. You merely need to return a stream
      // for it to write the sitemap urls to and the expected url where that sitemap will be hosted
      getSitemapStream: (i) => {
        const sitemapStream = new SitemapStream({
          hostname: domain,
        });
        const path = `./public/sitemaps/sitemap-${i}.xml.gz`;
        const publicPath = `/sitemaps/sitemap-${i}.xml.gz`
        sitemapStream
          // .pipe(createGzip()) // compress the output of the sitemap
          .pipe(createWriteStream(resolve(path))); // write it to sitemap-NUMBER.xml

        return [
          new URL(publicPath, domain + '/sitemaps/').toString(),
          sitemapStream,
        ];
      },
    });

    sms
      .pipe(createWriteStream(resolve('./public/sitemap.xml')));

    result.articles.forEach(article => {
      sms.write({
        url: `${domain}${article.swp_route.staticprefix}/${article.slug}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: article.updated_at + "Z"
      });
    });
    sms.end();
    console.log("sitemaps: 2. Created");
    streamToPromise(sms).then(() => {
      setTimeout(addTodaySitemapToIndex, 1500);
    })
  } catch (e) {
    console.error(e);
  }
})();
