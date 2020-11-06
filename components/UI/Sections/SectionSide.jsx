import React from "react";
import Ad from "../Ads/Ad";
import ArticleHeroSmall from "../Articles/ArticleHeroSmall";
import ArticleBriefList from "../Articles/ArticleBriefList";

const SectionSide = ({ articles, name }) => {
  return (
    <section className="section--small">
      <h2 className="section__hdl section__hdl--small">{name}</h2>

      {articles.map((item, index) => {
        if (index === 0)
          return (
            <ArticleHeroSmall
              article={item}
              key={"sectionSide" + index}
              headingClassName="hero__hdl--small"
            />
          );
        if (index === 5)
          return (
            <React.Fragment key={"sectionSide" + index}>
              <Ad />
              <ArticleHeroSmall
                article={item}
                headingClassName="hero__hdl--small"
              />
            </React.Fragment>
          );

        return <ArticleBriefList article={item} key={"sectionSide" + index} />;
      })}
    </section>
  );
};

export default SectionSide;
