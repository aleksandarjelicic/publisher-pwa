import React from "react";
import { motion } from "framer-motion";
import { getArticle } from "../../../services/articleService";
import { convertBodyImages } from "../../../services/articleBodyService";
import Store from "../../Store";
import ArticleHead from "./ArticleHead";
import Body from "./Body";
import SectionMost from "../../UI/Sections/SectionMost";
import SuggestedArticles from "./SuggestedArticles";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Ad from "../../UI/Ads/Ad";

class Article extends React.Component {
  static contextType = Store;

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
                <ArticleHead data={store.data} />
                <Body data={store.data} />
                <SuggestedArticles article={store.data} />
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
