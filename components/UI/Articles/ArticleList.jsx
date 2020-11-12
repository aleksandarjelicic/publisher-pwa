import LinkOffline from "../LinkOffline";
import Image from "../Image";

const ArticleList = ({ showImage = true, article }) => {
  const href = article.swp_route.staticprefix + "/" + article.slug;
  return (
    <LinkOffline href={href}>
      <a>
        <article className="list">
          {showImage && article.swp_article_feature_media && (
            <div className="list__img">
              <Image
                renditions={article.swp_article_feature_media.renditions}
                srcSet={[
                  { name: "301x200", maxWidth: "300" },
                  { name: "602x400", minWidth: "301", maxWidth: "640" },
                  { name: "301x200", minWidth: "641" },
                ]}
                fallbackRendition="301x200"
                width={301}
                height={200}
              />
            </div>
          )}

          <div className="list__text">
            {/* <span className="list__kicker">
              <a href="#">Gilets jaunes movement</a>
            </span> */}
            <h3 className="list__hdl">{article.title}</h3>
            <p className="list__lead">{article.lead}</p>
          </div>
        </article>
      </a>
    </LinkOffline>
  );
};

export default ArticleList;
