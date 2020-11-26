import { request } from "graphql-request";
import { GET_ARTICLE_QUERY } from "../graphql/queries"

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getArticle = (articleId) => {
  return request(api_url, GET_ARTICLE_QUERY, {
    articleId: articleId
  })
    .then((data) => {
      let article = data.article[0];

      if (!article) return {};

      article.related_articles = [];

      if (article.swp_article_related.length) {
        const related = article.swp_article_related.map(item => item.swp_article);
        article.related_articles = related;
      }

      return article
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return {};
    });
};
