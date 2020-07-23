import { Component } from "preact";
import { useRef } from "preact/hooks";
import Router from "next/router";
import Store from "../../Store";
import { getCollectionItems } from "../../../services/collectionService";

import Listing from "./Listing";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

class Collection extends Component {
  static getInitialProps = (context, routeId) => {
    const page = context.query.page || 1;
    return getCollectionItems(routeId, page).then((response) => response);
  };

  state = {
    isLoading: false,
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoading);
  }

  startLoading = () => {
    this.setState({ isLoading: true });
  };
  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  // used to scroll to top of list when page changes
  listTopRef = useRef(null);

  render() {
    return (
      <Store.Consumer>
        {(store) => (
          <div>
            <div className="grid">
              <div className="grid-element" ref={this.listTopRef}>
                {this.state.isLoading ? (
                  <div>loading...</div>
                ) : (
                  <Listing items={store.data.items} />
                )}
              </div>
              <div className="grid-element grid-element-small">
                <Sidebar />
              </div>
            </div>
            <Pagination
              listTopRef={this.listTopRef}
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
          </div>
        )}
      </Store.Consumer>
    );
  }
}

export default Collection;
