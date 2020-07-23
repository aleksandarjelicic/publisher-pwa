import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getCollectionItems = (routeId, page = 1, limit = 10) => {
  const ARTICLES_QUERY = `
  query getArticles($tenant_code: String = "", $routeId: Int, $limit: Int = 10, $offset: Int = 10) {
    metadata: swp_article_aggregate(where: {tenant_code: {_eq: $tenant_code}, route_id: {_eq: $routeId}}) {
      aggregate {
        totalCount: count
      }
    }
    items: swp_article(limit: $limit, offset: $offset, order_by: {published_at: desc}, where: {tenant_code: {_eq: $tenant_code}, route_id: {_eq: $routeId}}) {
      comments_count
      feature_media
      lead
      paywall_secured
      published_at
      slug
      title
      swp_route {
        staticprefix
      }
    }
  }
`;

  const offset = (page - 1) * limit;

  return request(api_url, ARTICLES_QUERY, {
    tenant_code: tenant_code,
    routeId: routeId,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      data.metadata.aggregate.currentPage = page;
      data.metadata.aggregate.perPage = limit;
      data.metadata.aggregate.pagesCount = Math.ceil(
        data.metadata.aggregate.totalCount / limit
      );

      return data;
    })
    .catch((err) => {
      console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};
