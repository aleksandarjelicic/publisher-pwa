import { request } from "graphql-request";
import { GET_CONTENTLISTITEMS_QUERY } from "../graphql/queries";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getContentList = (name, page = 1, limit = 10000) => {
  const offset = (page - 1) * limit;

  return request(api_url, GET_CONTENTLISTITEMS_QUERY, {
    tenant_code: tenant_code,
    listName: name,
    limit: limit,
    offset: offset
  })
    .then((data) => {
      let list = data.list[0]
      list.metadata.aggregate.currentPage = page;
      list.metadata.aggregate.perPage = limit;
      list.metadata.aggregate.pagesCount = Math.ceil(
        list.metadata.aggregate.totalCount / limit
      );

      return list;
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};
