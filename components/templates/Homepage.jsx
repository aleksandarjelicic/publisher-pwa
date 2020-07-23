import { getContentList } from "../../services/contentListService";
import { Component } from "preact";
import Store from "../Store";

import Item from "./Collection/Item";
import { sortAndDeduplicateDiagnostics } from "typescript";

class Homepage extends Component {
  static getInitialProps = async (context) => {
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
      <Store.Consumer>
        {(store) => (
          <div className="grid">
            <div className="grid-element">
              <h2>{store.data.list.name}</h2>
              {store.data.list.items.map((item) => {
                return <Item item={item.article} />;
              })}
            </div>
            <div className="grid-element">
              <h2>{store.data.list2.name}</h2>
              {store.data.list2.items.map((item) => {
                return <Item item={item.article} />;
              })}
            </div>
          </div>
        )}
      </Store.Consumer>
    );
  }
}

export default Homepage;
