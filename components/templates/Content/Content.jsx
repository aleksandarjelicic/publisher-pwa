import { getArticle } from "../../../services/articleService";
import React from "react";
import Store from "../../Store";

class Content extends React.Component {
  static getProps = (context, articleId) => {
    return getArticle(articleId).then((response) => response);
  };

  render() {
    return (
      <Store.Consumer>
        {(store) => (
          <div>
            <h1>{store.data.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: store.data.body,
              }}
            ></div>
          </div>
        )}
      </Store.Consumer>
    );
  }
}

export default Content;
