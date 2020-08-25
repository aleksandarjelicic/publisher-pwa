import { request } from "graphql-request"
import { GET_AUTHOR_QUERY } from "../graphql/queries"

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getAuthorInfo = (authorSlug) => {
  return request(api_url, GET_AUTHOR_QUERY, {
    slug: authorSlug
  })
    .then((data) => data.author[0] ? data.author[0] : {})
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return {};
    });
};
