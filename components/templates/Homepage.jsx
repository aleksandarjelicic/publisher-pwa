import React from "react";
import localforage from "localforage";
import { getContentList } from "../../services/contentListService";
import { getCollectionByRoute } from "../../services/collectionService";
import { motion } from "framer-motion";
import Store from "../Store";
import { pageTransitions } from "../../config/framerMotionAnimations";
import UniversalHead from "../layout/UniversalHead";
import ArticleHeroCover from "../UI/Articles/ArticleHeroCover";
import ArticleHero from "../UI/Articles/ArticleHero";
import ArticleList from "../UI/Articles/ArticleList";
import SectionTopic from "../UI/Sections/SectionTopic";
import SectionMost from "../UI/Sections/SectionMost";
import SectionSide from "../UI/Sections/SectionSide";
import SectionThree from "../UI/Sections/SectionThree";
import SectionTwo from "../UI/Sections/SectionTwo";
import Ad from "../UI/Ads/Ad";

class Homepage extends React.Component {
  static getProps = async (context) => {
    const topnews = await getContentList("Top news", 1, 7);
    const coronavirus = await getContentList("Coronavirus", 1, 3);
    const bottom = await getContentList("bottom", 1, 1);
    const politics = await getCollectionByRoute(397, 1, 3);
    const business = await getCollectionByRoute(393, 1, 3);
    const travel = await getCollectionByRoute(394, 1, 2);
    const sports = await getCollectionByRoute(395, 1, 3);
    const opinion = await getCollectionByRoute(393, 1, 6);

    return {
      topnews: topnews,
      coronavirus: coronavirus,
      bottom: bottom,
      politics: politics,
      business: business,
      travel: travel,
      sports: sports,
      opinion: opinion,
    };
  };

  render() {
    return (
      <>
        <UniversalHead />
        <Store.Consumer>
          {(store) => (
            <motion.div
              initial={pageTransitions.initial}
              animate={pageTransitions.animate}
              exit={pageTransitions.exit}
            >
              <div
                onClick={() => {
                  localforage.setItem("prevRouteType", {
                    type: "list",
                    name: "top news",
                  });
                }}
              >
                <ArticleHeroCover
                  article={
                    store.data.topnews.items[0]
                      ? store.data.topnews.items[0]
                      : {}
                  }
                />
              </div>
              <div className="mainCols">
                <div className="main--left">
                  <div
                    onClick={() => {
                      localforage.setItem("prevRouteType", {
                        type: "list",
                        name: "top news",
                      });
                    }}
                  >
                    {store.data.topnews.items.map((item, index) => {
                      if (index === 0) return null;
                      if (index === 3)
                        return (
                          <ArticleHero article={item} key={"topnews" + index} />
                        );
                      return (
                        <ArticleList article={item} key={"topnews" + index} />
                      );
                    })}
                  </div>
                  <SectionTopic
                    articles={store.data.coronavirus.items}
                    name="Corona virus"
                    moreUrl="/tag/coronavirus"
                  />
                </div>
                <div className="main--right">
                  <SectionMost />
                  <SectionSide
                    articles={store.data.opinion.items}
                    name="Opinions"
                  />
                </div>
              </div>
              <div className="mainCols">
                <div className="main--left">
                  <section className="section">
                    <SectionThree
                      articles={store.data.politics.items}
                      name="Politics"
                      moreUrl="/politics"
                    />
                    <SectionThree
                      articles={store.data.business.items}
                      name="Business"
                      moreUrl="/business"
                    />
                  </section>
                </div>
                <div className="main--right">
                  <Ad sticky={true} />
                </div>
              </div>
              <section className="section">
                <SectionTwo
                  articles={store.data.travel.items}
                  name="Travel"
                  moreUrl="/travel"
                />
              </section>
              <div className="mainCols">
                <div className="main--left">
                  <section className="section">
                    <SectionThree
                      articles={store.data.sports.items}
                      name="Sports"
                      moreUrl="/sports"
                    />
                  </section>
                </div>
                <div className="main--right">
                  <Ad sticky={true} />
                </div>
              </div>
              <ArticleHeroCover
                className="marginBottom0"
                article={
                  store.data.bottom.items[0] ? store.data.bottom.items[0] : {}
                }
              />
            </motion.div>
          )}
        </Store.Consumer>
      </>
    );
  }
}

export default Homepage;
