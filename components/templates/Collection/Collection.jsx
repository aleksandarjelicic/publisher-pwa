import React from "react";
import { motion } from "framer-motion";
import { pageTransitions } from "../../../config/framerMotionAnimations";
import Store from "../../Store";
import { getCollectionItems } from "../../../services/collectionService";

import Listing from "./Listing";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import CollectionHead from "./CollectionHead";

class Collection extends React.Component {
  static getProps = (context, routeId) => {
    const pageInSlugIndex = context.params.slug.indexOf("page");
    const page =
      pageInSlugIndex >= 0 ? context.params.slug[pageInSlugIndex + 1] : 1;
    return getCollectionItems(routeId, page).then((response) => response);
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
                <Listing items={store.data.items} />
              </div>
              <div className="grid-element grid-element-small">
                <Sidebar />
              </div>
            </div>
            <Pagination
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
            />
          </motion.div>
        )}
      </Store.Consumer>
    );
  }
}

export default Collection;
