import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getArticle = (articleId) => {
  const ARTICLE_QUERY = `
  query getArticle($articleId: Int) {
    article: swp_article(where: {id: {_eq: $articleId}}) {
      body
      comments_count
      feature_media
      extra
      lead
      paywall_secured
      published_at
      slug
      title
    }
  }
`;

  return request(api_url, ARTICLE_QUERY, {
    articleId: articleId
  })
    .then((data) => data.article[0] ? data.article[0] : {})
    .catch((err) => {
      console.log(err.response.errors);
      return {};
    });
};
