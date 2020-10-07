import { useState, useEffect } from "react";
import moment from "moment";
import { getArticles } from "../../../services/articlesService";
import classNames from "classnames";
import Loading from "../Loading/Loading";
import ArticleBriefList from "../Articles/ArticleBriefList";

const SectionMost = () => {
  const [openTab, setOpenTab] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [latestArticles, setLatestArticles] = useState([]);
  const [mostReadArticles, setMostReadArticles] = useState([]);

  const currenList = openTab === 1 ? latestArticles : mostReadArticles;

  useEffect(() => {
    getArticles("", 4).then((data) => {
      setLoading(false);
      setLatestArticles(data.items);
    });
  }, []);

  useEffect(() => {
    if (openTab === 2 && !mostReadArticles.length) {
      setLoading(true);
      const sevenDaysAgo = moment()
        .add(-7, "days")
        .format("YYYY-MM-DDT00:00:00");
      getArticles(
        'published_at: {_gt: "' + sevenDaysAgo + '"}',
        4,
        1,
        "swp_article_statistics: {page_views_number: desc}"
      ).then((data) => {
        setLoading(false);
        setMostReadArticles(data.items);
      });
    }
  }, [openTab]);

  return (
    <div className="tabs">
      <ul className="tabs__nav">
        <li>
          <a
            onClick={() => setOpenTab(1)}
            className={classNames("tabs__item", {
              "tabs__item--active": openTab === 1,
            })}
          >
            Latest
          </a>
        </li>
        <li>
          <a
            onClick={() => setOpenTab(2)}
            className={classNames("tabs__item", {
              "tabs__item--active": openTab === 2,
            })}
          >
            Most read
          </a>
        </li>
      </ul>
      <div className="tabs__content">
        {isLoading && (
          <div style={{ padding: "50px 0 60px 0" }}>
            <Loading dark={true} />
          </div>
        )}
        {currenList.map((item, index) => (
          <ArticleBriefList
            key={"sectionMost" + openTab + "-" + index}
            article={item}
            show="relative_date"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionMost;
