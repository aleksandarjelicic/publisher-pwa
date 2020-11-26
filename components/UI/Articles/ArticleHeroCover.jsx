import LinkOffline from "../LinkOffline";
import Image from "../Image";

const ArticleHeroCover = ({ className, article }) => {
  const href = article.swp_route.staticprefix + "/" + article.slug;
  const gallery = article.swp_slideshows.length ? true : false;

  return (
    <article className={`hero hero--cover ${className}`}>
      <LinkOffline href={href}>
        <a>
          {article.swp_article_feature_media && (
            <Image
              renditions={article.swp_article_feature_media.renditions}
              srcSet={[
                { name: "500x259", maxWidth: "500" },
                { name: "768x389", minWidth: "501", maxWidth: "768" },
                { name: "1084x550", minWidth: "969" },
              ]}
              fallbackRendition="768x389"
              width={1084}
              height={550}
              className="hero__img"
            />
          )}
          {gallery ? (
            <img
              className="icon icon--hero"
              src="img/icon-gallery.svg"
              alt=""
            />
          ) : null}
          <div className="hero__text hero__text--cover">
            {/* <span className="hero__kicker">Gilets jaunes movement</span> */}
            <h2 className="hero__hdl hero__hdl--cover">{article.title}</h2>
            <p className="hero__lead">{article.lead}</p>
          </div>
        </a>
      </LinkOffline>
    </article>
  );
};

export default ArticleHeroCover;
