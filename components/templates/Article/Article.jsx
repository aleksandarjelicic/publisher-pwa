import { getArticle } from "../../../services/articleService";
import { Component } from "preact";
import Store from "../../Store";

class Article extends Component {
  static getInitialProps = (context, articleId) => {
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

export default Article;
