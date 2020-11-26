import LinkOffline from "../LinkOffline";
import Image from "../Image";

const ArticleHeroSmall = ({ article, headingClassName = "" }) => {
  const href = article.swp_route.staticprefix + "/" + article.slug;
  const gallery = article.swp_slideshows.length ? true : false;
  return (
    <article className="hero hero--small">
      <LinkOffline href={href}>
        <a>
          {article.swp_article_feature_media && (
            <Image
              renditions={article.swp_article_feature_media.renditions}
              srcSet={[
                { name: "500x500", maxWidth: "500" },
                { name: "707x707", minWidth: "501", maxWidth: "768" },
                { name: "500x500", minWidth: "769" },
              ]}
              fallbackRendition="500x500"
              width={500}
              height={500}
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
          <div className="hero__text hero__text--small">
            {/* <span className="hero__kicker">Gallery</span> */}
            <h2 className={`hero__hdl ${headingClassName}`}>{article.title}</h2>
          </div>
        </a>
      </LinkOffline>
    </article>
  );
};

export default ArticleHeroSmall;
