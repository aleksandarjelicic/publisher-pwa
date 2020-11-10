import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Store from "../../Store";
import Link from "next/link";
import { isCached } from "../../../services/cacheService";
import Image from "../Image";

const ArticleList = ({ showImage = true, article }) => {
  const store = useContext(Store);
  const href = article.swp_route.staticprefix + "/" + article.slug;
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
      className={classNames("list", {
        unavailableOffline: !_isCached && !store.isOnline,
      })}
    >
      {showImage && article.swp_article_feature_media && (
        <Link href={href}>
          <a className="list__img">
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
          </a>
        </Link>
      )}

      <div className="list__text">
        {/* <span className="list__kicker">
              <a href="#">Gilets jaunes movement</a>
            </span> */}
        <h3 className="list__hdl">
          <Link href={href}>
            <a>{article.title}</a>
          </Link>
        </h3>
        <p className="list__lead">{article.lead}</p>
      </div>
    </article>
  );
};

export default ArticleList;
