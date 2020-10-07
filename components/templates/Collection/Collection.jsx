import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Store from "../../Store";
import { getCollectionItems } from "../../../services/collectionService";
import Listing from "./Listing";
import SectionMost from "../../UI/Sections/SectionMost";
import Ad from "../../UI/Ads/Ad";
import CollectionHead from "./CollectionHead";

class Collection extends React.Component {
  static contextType = Store;

  static getProps = (context, routeId) => {
    const pageInSlugIndex = context.params.slug.indexOf("page");
    const page =
      pageInSlugIndex >= 0 ? context.params.slug[pageInSlugIndex + 1] : 1;
    return getCollectionItems(routeId, page, 2).then((response) => response);
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      routeId: this.context.route.id,
      items: this.context.data.items,
      currentPage: this.context.data.metadata.aggregate.currentPage,
      pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
      showLoadMore: this.context.data.metadata.aggregate.pagesCount
        ? true
        : false,
      loading: false,
    };
  }

  loadMore = async () => {
    if (this.state.currentPage >= this.state.pagesCount) return;
    this.setState({ loading: true });
    const page = this.state.currentPage + 1;
    const data = await getCollectionItems(this.state.routeId, page, 2);
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
                  <button
                    style={{ margin: "2em auto", display: "block" }}
                    onClick={this.loadMore}
                    disabled={this.state.loading}
                  >
                    load more
                  </button>
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
