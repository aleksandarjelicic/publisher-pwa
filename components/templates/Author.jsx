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
            <div className="mainCols">
              <div className="main--left">
                <section className="section"></section>
              </div>
              <div className="main--right">
                <div className="authorBox">
                  <figure className="authorBox__img">
                    {store.data.avatar_url}
                  </figure>
                  <h2 className="authorBox__hdl">{store.data.name}</h2>
                  <p className="authorBox__pos">Dreamy editor in chief</p>
                  <p className="authorBox__bio">{store.data.biography}</p>
                  <ul className="authorBox__icons">
                    <li>
                      <a href="{store.data.facebook}" target="_BLANK">
                        <img src="img/social-fb.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="{store.data.twitter}" target="_BLANK">
                        <img src="img/social-tw.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="{store.data.instagram}" target="_BLANK">
                        <img src="img/social-ig.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="{store.data.author_media_id}" target="_BLANK">
                        <img src="img/social-rss.svg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Author;
