import React from "react";
import { motion } from "framer-motion";
import { getArticle } from "../../../services/articleService";
import { convertBodyImages } from "../../../services/articleBodyService";
import Store from "../../Store";

import ArticleHead from "./ArticleHead";
import Image from "../../UI/Image";
import Slideshow from "../../UI/Slideshow";

import SectionMost from "../../UI/Sections/SectionMost";

import { pageTransitions } from "../../../config/framerMotionAnimations";

import Ad from "../../UI/Ads/Ad";

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
            <div className="mainCols article">
              <div className="main--left">
                <article className="article__full">
                  <ArticleHead data={store.data} />
                  <span className="article__kicker">
                    Gilets jaunes movement
                  </span>
                  <h1 className="article__headline">{store.data.title}</h1>
                  <p className="article__lead">
                    Public sector workers in France continue to bring
                    transportation in the country to a virtual standstill as
                    they protest pension reforms.
                  </p>
                  <div className="article__info">
                    <div className="article__meta">
                      <time
                        class="article__time"
                        datetime="2020-06-28 14:20:00"
                      >
                        28 June 2020
                      </time>
                      {store.data.swp_article_authors &&
                      store.data.swp_article_authors.length ? (
                        <React.Fragment>
                          {store.data.swp_article_authors.map((item, index) => (
                            <span
                              className="article__author"
                              key={"author" + index}
                            >
                              {" "}
                              {item.swp_author.name}
                            </span>
                          ))}
                        </React.Fragment>
                      ) : null}
                    </div>

                    <div className="article__social">Social Icons</div>
                  </div>
                  {store.data.swp_article_feature_media && (
                    <Image
                      renditions={
                        store.data.swp_article_feature_media.renditions
                      }
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
                      className="article__image"
                    />
                  )}

                  <div
                    className="article__text"
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
                  <div className="tags">
                    <h4 className="tags__hdl">Tags</h4>
                    <ul className="tag__items">
                      <li className="tag__item">
                        <a href="#">France</a>
                      </li>
                      <li className="tag__item">
                        <a href="#">Gilets jaunes</a>
                      </li>
                      <li className="tag__item">
                        <a href="#">EU</a>
                      </li>
                      <li className="tag__item">
                        <a href="#">Strike</a>
                      </li>
                      <li className="tag__item">
                        <a href="#">Protests in France</a>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
              <div className="main--right">
                <Ad />
                <SectionMost />
                <Ad sticky={true} />
              </div>
            </div>
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Article;
