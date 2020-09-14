import { request } from "graphql-request";
import { GET_ARTICLE_QUERY } from "../graphql/queries"

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getArticle = (articleId) => {
  return request(api_url, GET_ARTICLE_QUERY, {
    articleId: articleId
  })
    .then((data) => data.article[0] ? data.article[0] : {})
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return {};
    });
};
