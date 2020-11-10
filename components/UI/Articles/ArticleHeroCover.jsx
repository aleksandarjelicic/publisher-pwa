import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { isCached } from "../../../services/cacheService";
import Image from "../Image";
import Store from "../../Store";

const ArticleHeroCover = ({ className, article }) => {
  const store = useContext(Store);
  const href = article.swp_route.staticprefix + "/" + article.slug;
  const gallery = article.swp_slideshows.length ? true : false;
  const [_isCached, setCached] = useState(false);

  useEffect(() => {
    if (!store.isOnline) {
      isCached(href).then((res) => {
        setCached(res);
      });
    }
  }, [store.isOnline]);

  return (
    <article
      className={classNames("hero hero--cover", className, {
        unavailableOffline: !_isCached && !store.isOnline,
      })}
    >
      <Link href={href}>
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
      </Link>
    </article>
  );
};

export default ArticleHeroCover;
