import React from "react";
import Image from "../../UI/Image";
import AuthorsList from "../../UI/AuthorsList";
import Time from "../../UI/Time";
import LinkOffline from "../../UI/LinkOffline";
import { trimHtml } from "../../../services/helpers";

const Teaser = ({ data }) => {
  const href = data.swp_route.staticprefix + "/" + data.slug;

  return (
    <>
      <article className="article__full article__sugg">
        {/* <span className="article__kicker">
                    Gilets jaunes movement
                  </span> */}
        <h1 className="article__headline">{data.title}</h1>
        <p className="article__lead">{data.lead}</p>
        <div className="article__info">
          <div className="article__meta">
            <Time value={data.published_at} />
            <AuthorsList
              className="article__author"
              authors={data.swp_article_authors}
            />
          </div>
        </div>
        {data.swp_article_feature_media && (
          <Image
            renditions={data.swp_article_feature_media.renditions}
            srcSet={[
              { name: "400x240", maxWidth: "600" },
              { name: "600x360", minWidth: "601", maxWidth: "960" },
              { name: "960x480", minWidth: "961" },
            ]}
            fallbackRendition="400x240"
            thumbnailRendition="300x220"
            width={960}
            height={480}
            caption={data.swp_article_feature_media.description}
            className="article__image"
          />
        )}
        <div style={{ position: "relative" }}>
          <div
            className="article__text marginBottom30"
            dangerouslySetInnerHTML={{
              __html: trimHtml(data.body, { limit: 200 }),
            }}
          ></div>
          <div className="article__suggBtn"></div>
          <LinkOffline href={href}>
            <a className="btn btn--load center">continue reading</a>
          </LinkOffline>
        </div>
      </article>
    </>
  );
};

export default Teaser;
