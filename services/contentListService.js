import { request } from "graphql-request";
import { GET_CONTENTLISTITEMS_QUERY } from "../graphql/queries";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getContentList = (name, limit = 1000) => {
  return request(api_url, GET_CONTENTLISTITEMS_QUERY, {
    tenant_code: tenant_code,
    listName: name,
    limit: limit,
  })
    .then((data) => {
      return data.list[0];
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return {};
    });
};
