const setupHtmlToJson = require('html-to-article-json');
const articleJsonToAmp = require("article-json-to-amp");

const htmlToJson = setupHtmlToJson({});
const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

exports.convertToAmp = (body) => {
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
