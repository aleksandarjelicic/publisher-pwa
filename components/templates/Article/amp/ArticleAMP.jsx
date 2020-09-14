import { getArticle } from "../../../../services/articleService";

import React from "react";
import Store from "../../../Store";
import ArticleHead from "../ArticleHead";
import AmpImage from "./AmpImage";
import AmpSlideshow from "./AmpSlideshow";
import styles from "./AmpStyles";

const config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  defaultRendition: {
    name: "600x360",
    width: 600,
    height: 360,
  },
};

class ArticleAMP extends React.Component {
  static getProps = (context, articleId) => {
    const isServer = process.browser ? false : true;

    return getArticle(articleId).then(async (response) => {
      let ampBody = "";
      if (isServer) {
        const { convertToAmp } = eval(
          `require('../../../services/ampService.js')`
        );
        ampBody = await convertToAmp(response.body);
      }
      return { ...response, ampBody: ampBody };
    });
  };

  render() {
    return (
      <>
        <style jsx>{styles}</style>
        <Store.Consumer>
          {(store) => (
            <main>
              <ArticleHead data={store.data} route={store.route} />
              <h1>{store.data.title}</h1>

              {store.data.swp_article_feature_media && (
                <AmpImage
                  renditions={store.data.swp_article_feature_media.renditions}
                  caption={store.data.swp_article_feature_media.description}
                  renditionName={config.defaultRendition.name}
                  width={config.defaultRendition.width}
                  height={config.defaultRendition.height}
                  className="mainImage"
                />
              )}

              {store.data.swp_article_authors &&
              store.data.swp_article_authors.length ? (
                <p>
                  Author:
                  {store.data.swp_article_authors.map((item, index) => (
                    <span key={"author" + index}> {item.swp_author.name}</span>
                  ))}
                </p>
              ) : null}
              <div
                dangerouslySetInnerHTML={{
                  __html: store.data.ampBody,
                }}
              ></div>

              {store.data.swp_slideshows && store.data.swp_slideshows.length
                ? store.data.swp_slideshows.map((slideshow, index) => (
                    <AmpSlideshow
                      key={`slideshow${index}`}
                      slideshowId={`slideshow${index}`}
                      items={slideshow.swp_slideshow_items}
                      renditionName={config.defaultRendition.name}
                      width={config.defaultRendition.width}
                      height={config.defaultRendition.height}
                    />
                  ))
                : null}

              <amp-social-share
                type="whatsapp"
                data-param-text={`${store.data.title} - ${
                  config.domain + store.route.incomingUri
                }&utm_source=Whatsapp&utm_medium=whatsapp-amp&utm_campaign=whatsapp`}
              ></amp-social-share>
              <amp-social-share
                type="facebook"
                data-param-app_id="395335463866299"
                data-param-text={store.data.title}
                data-param-url={config.domain + store.route.incomingUri}
              ></amp-social-share>
              <amp-social-share
                type="twitter"
                data-param-text={store.data.title}
                data-param-url={config.domain + store.route.incomingUri}
              ></amp-social-share>
              <amp-social-share
                type="email"
                data-param-text={store.data.title}
                data-param-url={config.domain + store.route.incomingUri}
              ></amp-social-share>
            </main>
          )}
        </Store.Consumer>
      </>
    );
  }
}

export default ArticleAMP;
