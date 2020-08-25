import { request } from "graphql-request"
import { GET_COLLECTION_QUERY } from "../graphql/queries"

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getCollectionItems = (routeId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  return request(api_url, GET_COLLECTION_QUERY, {
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
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};
