import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import moment from "moment";
import { isCached } from "../../../services/cacheService";
import Store from "../../Store";

// show = "author" || "date" ||  "relative_date"
const ArticleBriefList = ({ article, show = "author" }) => {
  const store = useContext(Store);
  const href = article.swp_route.staticprefix + "/" + article.slug;
  let kicker = null;

  const [_isCached, setCached] = useState(false);

  useEffect(() => {
    if (!store.isOnline) {
      isCached(href).then((res) => {
        setCached(res);
      });
    }
  }, [store.isOnline]);

  switch (show) {
    case "author":
      kicker = (
        <span className="briefList__kicker">
          {article.swp_article_authors.map((item, index) => (
            <span key={"author" + index}> {item.swp_author.name}</span>
          ))}
        </span>
      );
      break;
    case "date":
      kicker = (
        <span className="briefList__kicker">
          {moment(article.published_at).format("YYYY-MM-DD, HH:mm")}
        </span>
      );
      break;
    case "relative_date":
      kicker = (
        <span className="briefList__kicker">
          {moment(article.published_at).fromNow()}
        </span>
      );
      break;
  }

  return (
    <article
      className={classNames("briefList", {
        unavailableOffline: !_isCached && !store.isOnline,
      })}
    >
      {kicker}
      <h3 className="briefList__hdl">
        <Link href={href}>
          <a>{article.title}</a>
        </Link>
      </h3>
    </article>
  );
};

export default ArticleBriefList;
