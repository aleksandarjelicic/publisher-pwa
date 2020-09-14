import { getArticle } from "../../../services/articleService";
import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Store from "../../Store";

class Content extends React.Component {
  static getProps = (context, articleId) => {
    return getArticle(articleId).then((response) => response);
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
            <h1>{store.data.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: store.data.body,
              }}
            ></div>
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Content;
