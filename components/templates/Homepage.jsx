import { getContentList } from "../../services/contentListService";
import React from "react";
import Store from "../Store";
import UniversalHead from "../layout/UniversalHead";

import Item from "./Collection/Item";

class Homepage extends React.Component {
  static getProps = async (context) => {
    const list = await getContentList("AAA");
    const list2 = await getContentList("auto2");
    const somethingElse = "else";

    return {
      list: list ? list : {},
      list2: list2 ? list2 : {},
      something: somethingElse,
    };
  };

  render() {
    return (
      <>
        <UniversalHead />
        <Store.Consumer>
          {(store) => (
            <div className="grid">
              <div className="grid-element">
                <h2>{store.data.list.name}</h2>
                {store.data.list.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
              </div>
              <div className="grid-element">
                <h2>{store.data.list2.name}</h2>
                {store.data.list2.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
              </div>
            </div>
          )}
        </Store.Consumer>
      </>
    );
  }
}

export default Homepage;
