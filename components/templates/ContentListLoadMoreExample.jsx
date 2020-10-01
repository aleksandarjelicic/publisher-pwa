import { getContentList } from "../../services/contentListService";
import React from "react";
import { motion } from "framer-motion";
import Store from "../Store";
import { pageTransitions } from "../../config/framerMotionAnimations";
import UniversalHead from "../layout/UniversalHead";

class ContentListLoadMoreExample extends React.Component {
  static contextType = Store;

  static getProps = async (context) => {
    const list = await getContentList("AAA");
    const list2 = await getContentList("auto2", 1, 10);

    return {
      list: list,
      list2: list2,
    };
  };

  state = {
    list2: {
      name: this.context.data.list2.name,
      items: this.context.data.list2.items,
      currentPage: this.context.data.list2.metadata.aggregate.currentPage,
      pagesCount: this.context.data.list2.metadata.aggregate.pagesCount || 0,
      showLoadMore: this.context.data.list2.metadata.aggregate.pagesCount
        ? true
        : false,
      limit: 10,
      loading: false,
    },
  };

  loadMoreList2 = async () => {
    if (this.state.list2.currentPage >= this.state.list2.pagesCount) return;
    this.setState({ list2: { ...this.state.list2, loading: true } });
    const page = this.state.list2.currentPage + 1;

    const data = await getContentList(
      this.state.list2.name,
      page,
      this.state.list2.limit
    );

    const showLoadMore =
      data.metadata.aggregate.currentPage >= data.metadata.aggregate.pagesCount
        ? false
        : true;
    this.setState({
      list2: {
        items: [...this.state.list2.items, ...data.items],
        currentPage: data.metadata.aggregate.currentPage,
        pagesCount: data.metadata.aggregate.pagesCount,
        showLoadMore,
        loading: false,
      },
    });
  };

  render() {
    return (
      <>
        <UniversalHead />
        <Store.Consumer>
          {(store) => (
            <motion.div
              initial={pageTransitions.initial}
              animate={pageTransitions.animate}
              exit={pageTransitions.exit}
            >
              <div className="grid-element">
                <h2>{store.data.list.name}</h2>
                {store.data.list.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
              </div>
              <div className="grid-element">
                <h2>{this.state.list2.name}</h2>
                {this.state.list2.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
                {this.state.list2.showLoadMore ? (
                  <button
                    style={{ margin: "2em auto", display: "block" }}
                    onClick={this.loadMoreList2}
                    disabled={this.state.list2.loading ? true : false}
                  >
                    load more
                  </button>
                ) : null}
              </div>
            </motion.div>
          )}
        </Store.Consumer>
      </>
    );
  }
}

export default ContentListLoadMoreExample;
