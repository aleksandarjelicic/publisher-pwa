import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import localforage from "localforage";
import { getContentList } from "../../../services/contentListService";
import {
  getCollectionByRoute,
  getCollectionByTag,
  getCollectionByAuthor,
} from "../../../services/collectionService";
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
        const newArticles = await getSuggestedArticles(
          prevRouteType,
          readArticles,
          page,
          articles
        );
        setArticles(newArticles);

        setLoading(false);
      });
    });
  };

  // recurrency
  const getSuggestedArticles = async (
    prevRouteType,
    readArticles,
    prevPage,
    prevArticles
  ) => {
    const currentPage = prevPage + 1;
    let collection;

    if (prevRouteType && prevRouteType.type === "page") {
      // collection
      collection = await getCollectionByRoute(
        article.swp_route.id,
        currentPage
      );
    } else if (prevRouteType && prevRouteType.type === "tag") {
      // tag pages
      collection = await getCollectionByTag(prevRouteType.name, currentPage);
    } else if (prevRouteType && prevRouteType.type === "author") {
      // author page
      collection = await getCollectionByAuthor(prevRouteType.name, currentPage);
    } else {
      // content list, directly to article, default
      let listName = "top news";
      if (
        prevRouteType &&
        prevRouteType.type === "list" &&
        prevRouteType.name
      ) {
        listName = prevRouteType.name;
      }

      collection = await getContentList(listName, currentPage);
    }

    // change to collection in case we run out of articles from content list.
    // Else update state with current values
    if (
      (!prevRouteType || prevRouteType.type === "list") &&
      collection.metadata.aggregate.currentPage ===
        collection.metadata.aggregate.pagesCount
    ) {
      localforage.setItem("prevRouteType", {
        type: "page",
        kind: "collection",
      });
      setPage(0);
      setTotalPages(1);
    } else {
      setPage(collection.metadata.aggregate.currentPage);
      setTotalPages(collection.metadata.aggregate.pagesCount);
    }

    let newArticles = collection.items.filter(
      (item) => !readArticles.includes(item.id)
    );
    newArticles = collection.items.filter(
      (item) => !readArticles.includes(item.id)
    );

    newArticles = [...prevArticles, ...newArticles];

    if (
      newArticles.length - articles.length < 4 &&
      collection.metadata.aggregate.pagesCount > currentPage
    ) {
      return getSuggestedArticles(
        prevRouteType,
        readArticles,
        currentPage,
        newArticles
      );
    }

    return newArticles;
  };

  return (
    <>
      {articles.map((article, index) => (
        <Teaser data={article} key={"suggested_" + article.id + "_" + index} />
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
