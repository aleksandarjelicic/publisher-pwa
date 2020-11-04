import Link from "next/link";
import moment from "moment";

// show = "author" || "date" ||  "relative_date"
const ArticleBriefList = ({ article, show = "author" }) => {
  const href = article.swp_route.staticprefix + "/" + article.slug;
  let kicker = null;

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
    <article className="briefList">
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
