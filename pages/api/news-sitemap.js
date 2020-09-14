import { request } from "graphql-request";
import moment from 'moment';
import { runMiddleware, getCacheKey } from "../../services/apiHelpers";
import Cors from 'cors';
import LRUCache from 'lru-cache';

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

const GET_ARTICLES_QUERY = `
query MyQuery($twoDays: timestamp = "",$tenant_code: String = "") {
  articles: swp_article(where: {published_at: {_gt: $twoDays}, tenant_code: {_eq: $tenant_code}}, order_by: {published_at: asc}) {
    slug
    title
    locale
    published_at
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
    console.log("+++ news-sitemap.xml from cache");
    res.setHeader('Content-Type', 'application/xml'
    );
    res.write(ssrCache.get(key));
    res.end();
    return
  }

  let twoDays = moment().add(-2, 'd').startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">';

  const result = await request(api_url, GET_ARTICLES_QUERY, {
    tenant_code: tenant_code,
    twoDays: twoDays
  })

  result.articles.forEach((article) => {
    sitemap += '<url>';
    sitemap += '<loc>' + domain + '/' + article.slug + '</loc>';
    sitemap += '	<news:news>';
    sitemap += '	<news:publication>';
    sitemap += '  		<news:name>' + siteName + '</news:name>';
    sitemap += '   		<news:language>' + article.locale + '</news:language>';
    sitemap += '  	</news:publication>';
    sitemap += ' 	<news:publication_date>' + article.published_at + 'Z</news:publication_date>';
    sitemap += '  	<news:title>' + article.title + '</news:title>';
    sitemap += '</news:news>';
    sitemap += '</url>';
  });

  res.setHeader("Content-Type", "text/xml");
  // write the generate sitemap to the output
  sitemap += '</urlset>';

  ssrCache.set(key, sitemap)
  console.log("--- news-sitemap.xml dynamically rendered");
  res.write(sitemap);
  // end and send the data to the user or service.
  res.end();
};