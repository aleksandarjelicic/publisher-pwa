import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import localforage from "localforage";
import { getContentList } from "../../../services/contentListService";
import { getCollectionByRoute } from "../../../services/collectionService";
import Loading from "../../UI/Loading/Loading";
import Teaser from "./Teaser";

const SuggestedArticles = ({ article }) => {
  const { ref, inView } = useInView();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (inView && page < totalPages) {
      loadSuggestedArticles();
    }
  }, [inView]);

  useEffect(() => {
    // reset when article changes
    if (articles.length) {
      setArticles([]);
      setPage(0);
      setTotalPages(1);
    }
  }, [article.id]);

  const loadSuggestedArticles = () => {
    if (typeof window === "undefined") return;
    setLoading(true);
    localforage.getItem("prevRouteType").then((prevRouteType) => {
      localforage.getItem("readArticles").then(async (readArticles) => {
        if (prevRouteType && prevRouteType.type === "page") {
          // collection
          const newArticles = await getSuggestedArticlesFromRoute(
            article.swp_route.id,
            readArticles,
            page,
            articles
          );
          setArticles(newArticles);
        } else if (prevRouteType && prevRouteType.type === "tag") {
          // tag pages
        } else {
          // content list, directly to article
          let listName = "top news";
          if (
            prevRouteType &&
            prevRouteType.type === "list" &&
            prevRouteType.name
          ) {
            listName = prevRouteType.name;
          }

          const newArticles = await getSuggestedArticlesFromContentList(
            listName,
            readArticles,
            page,
            articles
          );
          setArticles(newArticles);
        }
        setLoading(false);
      });
    });
  };

  // recurrency
  const getSuggestedArticlesFromContentList = async (
    listName,
    readArticles,
    prevPage,
    prevArticles
  ) => {
    const currentPage = prevPage + 1;
    const list = await getContentList(listName, currentPage, 10);

    setPage(list.metadata.aggregate.currentPage);
    setTotalPages(list.metadata.aggregate.pagesCount);

    let newArticles = list.items.filter(
      (item) => !readArticles.includes(item.id)
    );
    newArticles = [...prevArticles, ...newArticles];

    if (
      newArticles.length < 4 &&
      list.metadata.aggregate.pagesCount > currentPage
    ) {
      return getSuggestedArticlesFromContentList(
        listName,
        readArticles,
        currentPage,
        newArticles
      );
    }

    return newArticles;
  };

  // recurrency
  const getSuggestedArticlesFromRoute = async (
    routeId,
    readArticles,
    prevPage,
    prevArticles
  ) => {
    const currentPage = prevPage + 1;
    const collection = await getCollectionByRoute(routeId, currentPage, 10);

    setPage(collection.metadata.aggregate.currentPage);
    setTotalPages(collection.metadata.aggregate.pagesCount);

    let newArticles = collection.items.filter(
      (item) => !readArticles.includes(item.id)
    );
    newArticles = [...prevArticles, ...newArticles];

    if (
      newArticles.length < 4 &&
      collection.metadata.aggregate.pagesCount > currentPage
    ) {
      return getSuggestedArticlesFromRoute(
        routeId,
        readArticles,
        currentPage,
        newArticles
      );
    }

    return newArticles;
  };

  return (
    <>
      {articles.map((article) => (
        <Teaser data={article} key={"suggested" + article.id} />
      ))}
      {isLoading && (
        <div style={{ padding: "50px 0 60px 0" }}>
          <Loading dark={true} />
        </div>
      )}
      <span ref={ref}></span>
    </>
  );
};

export default SuggestedArticles;
