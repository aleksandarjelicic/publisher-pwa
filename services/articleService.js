import { request } from "graphql-request";
import { GET_ARTICLE_QUERY } from "../graphql/queries"
import setupHtmlToJson from "html-to-article-json";
import articleJsonToAmp from "article-json-to-amp";

const htmlToJson = setupHtmlToJson({});

const api_url = process.env.NEXT_PUBLIC_API_URL;
const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

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

export const convertToAmp = (body) => {
  return Promise.resolve(htmlToJson(body))
    .then(json => {
      json.forEach(element => {
        if (element.type === 'embed' && element.embedType === 'image') {
          let split = element.src.split("/");
          let file = split[split.length - 1];
          element.src = media_url + file;
        }
      });
      return Promise.resolve(articleJsonToAmp(json))
    });

}
