import { SitemapStream, streamToPromise } from 'sitemap';
import { runMiddleware, getCacheKey } from "../../services/apiHelpers";
import Cors from 'cors';
import { request } from "graphql-request";
import moment from 'moment';
import LRUCache from 'lru-cache';


const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

const GET_ARTICLES_QUERY = `
query MyQuery($currentDay: timestamp = "",$tenant_code: String = "") {
  articles: swp_article(where: {published_at: {_gt: $currentDay}, tenant_code: {_eq: $tenant_code}}, order_by: {published_at: asc}) {
    slug
    updated_at
  }
}
`;

const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS'],
});

const ssrCache = new LRUCache({
  max: 10,
  maxAge: 1000 * 60 * 5 // 5 minutes
});

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  const key = getCacheKey(req);

  if (ssrCache.has(key)) {
    console.log("+++ sitemap-today.xml from cache");
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });
    res.end(ssrCache.get(key))
    return
  }

  const currentDay = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  const result = await request(api_url, GET_ARTICLES_QUERY, {
    tenant_code: tenant_code,
    currentDay: currentDay
  })

  try {
    const smStream = new SitemapStream({
      hostname: `${domain}`,
      cacheTime: 600,
    });

    smStream.write({
      url: `/`,
      changefreq: 'always',
      priority: 0.3
    });

    result.articles.forEach(article => {
      smStream.write({
        url: `${domain}/${article.slug}`,
        changefreq: 'always',
        priority: 0.9,
        lastmod: article.updated_at + "Z"
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    ssrCache.set(key, sitemapOutput)

    console.log("--- sitemap-today.xml dynamically rendered");
    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}
