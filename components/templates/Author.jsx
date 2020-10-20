import React from "react";
import { motion } from "framer-motion";
import { getAuthorInfo } from "../../services/authorService";
import { getCollectionByAuthor } from "../../services/collectionService";
import { pageTransitions } from "../../config/framerMotionAnimations";
import Store from "../Store";

import CollectionHead from "./Collection/CollectionHead";
import Listing from "./Collection/Listing";
import ButtonLoadMore from "../UI/ButtonLoadMore";

let media_url = process.env.NEXT_PUBLIC_MEDIA_URL;
media_url = media_url.replace("media", "authors");

class Author extends React.Component {
  static contextType = Store;

  static getProps = async (context, id = null) => {
    const authorSlug = context.params.slug[context.params.slug.length - 1];
    const author = await getAuthorInfo(authorSlug);
    const articles = await getCollectionByAuthor(authorSlug);

    return {
      author: author,
      articles: articles,
    };
  };

  state = {
    route: this.context.route,
    items: this.context.data.articles.items,
    currentPage: this.context.data.articles.metadata.aggregate.currentPage,
    pagesCount: this.context.data.articles.metadata.aggregate.pagesCount || 0,
    showLoadMore:
      this.context.data.articles.metadata.aggregate.pagesCount > 1
        ? true
        : false,
    loading: false,
  };

  componentDidUpdate() {
    if (this.context.route.incomingUri !== this.state.route.incomingUri) {
      this.setState({
        route: this.context.route,
        items: this.context.data.articles.items,
        currentPage: this.context.data.articles.metadata.aggregate.currentPage,
        pagesCount:
          this.context.data.articles.metadata.aggregate.pagesCount || 0,
        showLoadMore:
          this.context.data.articles.metadata.aggregate.pagesCount > 1
            ? true
            : false,
        loading: false,
      });
    }
  }

  loadMore = async () => {
    if (this.state.currentPage >= this.state.pagesCount) return;

    this.setState({ loading: true });
    const page = this.state.currentPage + 1;
    const data = await getCollectionByAuthor(
      this.context.data.author.slug,
      page
    );
    const showLoadMore =
      data.metadata.aggregate.currentPage >= data.metadata.aggregate.pagesCount
        ? false
        : true;

    this.setState({
      items: [...this.state.items, ...data.items],
      currentPage: data.metadata.aggregate.currentPage,
      pagesCount: data.metadata.aggregate.pagesCount,
      showLoadMore,
      loading: false,
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
            <CollectionHead data={store} />
            <div className="mainCols">
              <div className="main--left">
                <h2>{store.data.author.name} articles</h2>
                <p>
                  total: {store.data.articles.metadata.aggregate.totalCount}
                </p>
                <section className="section">
                  <Listing items={this.state.items} allSmall={true} />
                  {this.state.showLoadMore ? (
                    <ButtonLoadMore
                      onClick={this.loadMore}
                      loading={this.state.loading}
                    />
                  ) : null}
                </section>
              </div>
              <div className="main--right">
                <div className="authorBox">
                  <figure className="authorBox__img">
                    <img src={`${media_url}${store.data.author.avatar_url}`} />
                  </figure>
                  <h2 className="authorBox__hdl">{store.data.author.name}</h2>
                  <p className="authorBox__pos">{store.data.author.role}</p>
                  <p className="authorBox__bio">
                    {store.data.author.biography}
                  </p>
                  <ul className="links links--icon marginBottom20">
                    <li>
                      <a href="{store.data.author.facebook}" target="_BLANK">
                        <img src="/img/social-fb.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="{store.data.author.twitter}" target="_BLANK">
                        <img src="/img/social-tw.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="{store.data.author.instagram}" target="_BLANK">
                        <img src="/img/social-ig.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="{store.data.author.author_media_id}"
                        target="_BLANK"
                      >
                        <img src="/img/social-rss.svg" alt="" />
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
