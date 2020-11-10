import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { isCached } from "../../../services/cacheService";
import Image from "../Image";
import Store from "../../Store";

const ArticleHero = ({ article }) => {
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
      className={classNames("hero", {
        unavailableOffline: !_isCached && !store.isOnline,
      })}
    >
      <Link href={href}>
        <a>
          {article.swp_article_feature_media && (
            <Image
              renditions={article.swp_article_feature_media.renditions}
              srcSet={[
                { name: "301x200", maxWidth: "300" },
                { name: "440x292", minWidth: "301", maxWidth: "500" },
                { name: "674x448", minWidth: "501" },
              ]}
              fallbackRendition="440x292"
              width={674}
              height={448}
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
          <div className="hero__text">
            {/* <span className="hero__kicker">Gilets jaunes movement</span> */}
            <h2 className="hero__hdl">{article.title}</h2>
            <p className="hero__lead">{article.lead}</p>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default ArticleHero;
