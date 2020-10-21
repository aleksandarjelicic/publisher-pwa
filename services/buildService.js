import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

const GET_ARTICLES_QUERY = `
  query MyQuery($tenant_code: String = "") {
    articles: swp_article(where: {tenant_code: {_eq: $tenant_code}, published_at: {_is_null: false}}, order_by: {published_at: desc}) {
      slug
      swp_route {
        staticprefix
      }
    }
  }
`;

export const getPaths = async () => {
  const result = await request(api_url, GET_ARTICLES_QUERY, {
    tenant_code: tenant_code,
  });

  let paths = [];

  result.articles.forEach((article) => {
    const routeSlug = article.swp_route.staticprefix.split("/");

    paths.push({
      params: {
        slug: [...routeSlug.filter((r) => r.length > 0), article.slug],
      },
    });
  });

  return paths;
};




