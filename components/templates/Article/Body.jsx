import React from "react";
import Image from "../../UI/Image";
import Slideshow from "../../UI/Slideshow";
import AuthorsList from "../../UI/AuthorsList";
import Time from "../../UI/Time";
import SectionThree from "../../UI/Sections/SectionThree";
import LinkOffline from "../../UI/LinkOffline";

const Body = ({ data }) => {
  return (
    <>
      <article className="article__full">
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

          <div className="article__social">Social Icons</div>
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

        <div
          className="article__text"
          dangerouslySetInnerHTML={{
            __html: data.body,
          }}
        ></div>

        {data.swp_slideshows && data.swp_slideshows.length
          ? data.swp_slideshows.map((slideshow, index) => (
              <Slideshow
                key={`slideshow${index}`}
                slideshowId={`slideshow${index}`}
                items={slideshow.swp_slideshow_items}
                srcSet={[
                  { name: "600x360", maxWidth: "600" },
                  { name: "960x480", minWidth: "601" },
                ]}
                width={960}
                height={480}
              />
            ))
          : null}

        {data.swp_article_keywords.length ? (
          <div className="tags">
            <h4 className="tags__hdl">Tags</h4>
            <ul className="tag__items">
              {data.swp_article_keywords.map((tag, index) => (
                <li className="tag__item" key={"tags_" + index}>
                  <LinkOffline href={"/tag/" + tag.swp_keyword.slug}>
                    <a>{tag.swp_keyword.name}</a>
                  </LinkOffline>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
      {data.related_articles.length ? (
        <SectionThree
          articles={data.related_articles}
          name="Related Articles"
        />
      ) : null}
    </>
  );
};

export default Body;
