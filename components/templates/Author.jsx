import { getAuthorInfo } from "../../services/authorService";
import { Component } from "preact";
import Store from "../Store";

class Author extends Component {
  static getInitialProps = (context, articleId) => {
    const authorSlug = "tomek-test-author";

    return getAuthorInfo(authorSlug).then((response) => response);
  };

  render() {
    return (
      <Store.Consumer>
        {(store) => (
          <div>
            <h1>{store.data.name}</h1>
            <div>{store.data.biography}</div>
            <div>{store.data.facebook}</div>
            <div>{store.data.instagram}</div>
            <div>{store.data.twitter}</div>
            <div>{store.data.avatar_url}</div>
            <div>{store.data.author_media_id}</div>
          </div>
        )}
      </Store.Consumer>
    );
  }
}

export default Author;
