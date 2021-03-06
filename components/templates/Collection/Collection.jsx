import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Store from "../../Store";
import { getCollectionByRoute } from "../../../services/collectionService";
import Listing from "./Listing";
import SectionMost from "../../UI/Sections/SectionMost";
import Ad from "../../UI/Ads/Ad";
import CollectionHead from "./CollectionHead";
import ButtonLoadMore from "../../UI/ButtonLoadMore";

class Collection extends React.Component {
  static contextType = Store;

  static getProps = (context, routeId) => {
    const pageInSlugIndex = context.params.slug.indexOf("page");
    const page =
      pageInSlugIndex >= 0 ? context.params.slug[pageInSlugIndex + 1] : 1;
    return getCollectionByRoute(routeId, page, 2).then((response) => response);
  };

  state = {
    routeId: this.context.route.id,
    items: this.context.data.items,
    currentPage: this.context.data.metadata.aggregate.currentPage,
    pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
    showLoadMore:
      this.context.data.metadata.aggregate.pagesCount > 1 ? true : false,
    loading: false,
  };

  componentDidUpdate() {
    if (this.context.route.id !== this.state.routeId) {
      this.setState({
        routeId: this.context.route.id,
        items: this.context.data.items,
        currentPage: this.context.data.metadata.aggregate.currentPage,
        pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
        showLoadMore:
          this.context.data.metadata.aggregate.pagesCount > 1 ? true : false,
        loading: false,
      });
    }
  }

  loadMore = async () => {
    if (this.state.currentPage >= this.state.pagesCount) return;
    this.setState({ loading: true });
    const page = this.state.currentPage + 1;
    const data = await getCollectionByRoute(this.state.routeId, page, 2);
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
                <Listing items={this.state.items} />
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

export default Collection;
