import React from "react";
import { motion } from "framer-motion";
import { getAuthorInfo } from "../../services/authorService";
import { pageTransitions } from "../../config/framerMotionAnimations";
import Store from "../Store";

class Author extends React.Component {
  static getProps = (context, id = null) => {
    const authorSlug = context.params.slug[context.params.slug.length - 1];

    return getAuthorInfo(authorSlug).then((response) => response);
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
            <h1>{store.data.name}</h1>
            <div>{store.data.biography}</div>
            <div>{store.data.facebook}</div>
            <div>{store.data.instagram}</div>
            <div>{store.data.twitter}</div>
            <div>{store.data.avatar_url}</div>
            <div>{store.data.author_media_id}</div>
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Author;
