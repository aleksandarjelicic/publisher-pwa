import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Store from "../../Store";
import { getCollectionItems } from "../../../services/collectionService";
import Listing from "./Listing";
import Sidebar from "./Sidebar";
import CollectionHead from "./CollectionHead";

class CollectionLoadMore extends React.Component {
  static contextType = Store;

  static getProps = (context, routeId) => {
    const pageInSlugIndex = context.params.slug.indexOf("page");
    const page =
      pageInSlugIndex >= 0 ? context.params.slug[pageInSlugIndex + 1] : 1;
    return getCollectionItems(routeId, page).then((response) => response);
  };

  state = {
    routeId: this.context.route.id,
    items: this.context.data.items,
    currentPage: this.context.data.metadata.aggregate.currentPage,
    pagesCount: this.context.data.metadata.aggregate.pagesCount || 0,
    showLoadMore: this.context.data.metadata.aggregate.pagesCount
      ? true
      : false,
    loading: false,
  };

  loadMore = async () => {
    if (this.state.currentPage >= this.state.pagesCount) return;
    this.setState({ loading: true });
    const page = this.state.currentPage + 1;

    const data = await getCollectionItems(this.state.routeId, page);

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
            <div className="grid">
              <div className="grid-element">
                <Listing items={this.state.items} />
              </div>
              <div className="grid-element grid-element-small">
                <Sidebar />
              </div>
            </div>
            {this.state.showLoadMore ? (
              <button
                style={{ margin: "2em auto", display: "block" }}
                onClick={this.loadMore}
                disabled={this.state.loading ? true : false}
              >
                load more
              </button>
            ) : null}

            {/* <Pagination
              currentPage={
                store.data.metadata
                  ? store.data.metadata.aggregate.currentPage
                  : 0
              }
              totalPages={
                store.data.metadata
                  ? store.data.metadata.aggregate.pagesCount
                  : 0
              }
            /> */}
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default CollectionLoadMore;
