import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import { getCollectionByTag } from "../../../services/collectionService";
import Store from "../../Store";

import CollectionHead from "./CollectionHead";
import Listing from "./Listing";
import SectionMost from "../../UI/Sections/SectionMost";
import Ad from "../../UI/Ads/Ad";
import ButtonLoadMore from "../../UI/ButtonLoadMore";

class Tag extends React.Component {
  static contextType = Store;

  static getProps = (context, id = null) => {
    const tagInSlugIndex = context.params.slug.indexOf("tag");
    const tagSlug = context.params.slug[tagInSlugIndex + 1];
    const pageInSlugIndex = context.params.slug.indexOf("page");
    const page =
      pageInSlugIndex >= 0 ? context.params.slug[pageInSlugIndex + 1] : 1;

    return getCollectionByTag(tagSlug, page).then((response) => response);
  };

  state = {
    route: this.context.route,
    tag: this.context.data.tag[0],
    items: this.context.data.items,
    currentPage: this.context.data.metadata.aggregate.currentPage,
    pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
    showLoadMore:
      this.context.data.metadata.aggregate.pagesCount > 1 ? true : false,
    loading: false,
  };

  componentDidUpdate() {
    if (this.context.route.incomingUri !== this.state.route.incomingUri) {
      this.setState({
        route: this.context.route,
        tag: this.context.data.tag[0],
        items: this.context.data.items,
        currentPage: this.context.data.metadata.aggregate.currentPage,
        pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
        showLoadMore: this.context.data.metadata.aggregate.pagesCount
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
    const data = await getCollectionByTag(this.state.tag.slug, page);
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
                <h2>Tag: {this.state.tag.name}</h2>
                <Listing items={this.state.items} allSmall={true} />
                {this.state.showLoadMore ? (
                  <ButtonLoadMore
                    onClick={this.loadMore}
                    loading={this.state.loading}
                  />
                ) : null}
              </div>
              <div className="main--right">
                <SectionMost />
                <Ad />
                <Ad sticky={true} />
              </div>
            </div>
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Tag;
