import React from "react";
import { motion } from "framer-motion";
import { getArticle } from "../../../services/articleService";
import { convertBodyImages } from "../../../services/articleBodyService";
import Store from "../../Store";

import ArticleHead from "./ArticleHead";
import Image from "../../UI/Image";
import Slideshow from "../../UI/Slideshow";

import { pageTransitions } from "../../../config/framerMotionAnimations";

class Article extends React.Component {
  static getProps = (context, articleId) => {
    return getArticle(articleId).then((response) => {
      return { ...response, body: convertBodyImages(response.body) };
    });
  };

  render() {
    return (
      <Store.Consumer>
        {(store) => (
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
          >
            <ArticleHead data={store.data} />
            <h1>{store.data.title}</h1>
            {store.data.swp_article_feature_media && (
              <Image
                renditions={store.data.swp_article_feature_media.renditions}
                srcSet={[
                  { name: "400x240", maxWidth: "600" },
                  { name: "600x360", minWidth: "601", maxWidth: "960" },
                  { name: "960x480", minWidth: "961" },
                ]}
                fallbackRendition="400x240"
                thumbnailRendition="300x220"
                width={960}
                height={480}
                caption={store.data.swp_article_feature_media.description}
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
                __html: store.data.body,
              }}
            ></div>
            {store.data.swp_slideshows && store.data.swp_slideshows.length
              ? store.data.swp_slideshows.map((slideshow, index) => (
                  <Slideshow
                    key={`slideshow${index}`}
                    slideshowId={`slideshow${index}`}
                    items={slideshow.swp_slideshow_items}
                    srcSet={[
                      { name: "600x360", maxWidth: "600" },
                      { name: "960x480", minWidth: "601" },
                    ]}
                    width={960}
                    height={480}
                  />
                ))
              : null}
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Article;
