import React, { useEffect } from "react";
import localforage from "localforage";
import { useAmp } from "next/amp";
import { getMenus } from "../services/menuService";
import { matchRoute } from "../services/routeMatcherService";
import { sendPageView } from "../services/publisherAnalytics";
import { getPaths } from "../services/buildService";
import Article from "../components/templates/Article/Article";
import ArticleAMP from "../components/templates/Article/amp/ArticleAMP";
import Collection from "../components/templates/Collection/Collection";
import Content from "../components/templates/Content/Content";
import NotFound from "../pages/404";
import SectionCustomTemplate from "../components/templates/Collection/SectionCustomTemplate";
import Author from "../components/templates/Author";
import Tag from "../components/templates/Collection/Tag";

import BaseLayout from "../components/layout/BaseLayout";

const default_collection_template = "category.html.twig";
const default_article_template = "article.html.twig";

// TODO
let _canBeAMP = false;
// TODO

const components = {
  Article: Article,
  ArticleAMP: ArticleAMP,
  Content: Content,
  Author: Author,
  NotFound: NotFound,
  Collection: Collection,
  SectionCustomTemplate: SectionCustomTemplate,
  Tag: Tag,
};

const renderer = (templateName) => {
  if (typeof components[templateName] !== "undefined") {
    return React.createElement(components[templateName]);
  }
  return React.createElement(() => (
    <div>Template '{templateName}' not found.</div>
  ));
};

const Pages = (props) => {
  const isAmp = useAmp();
  let template = props.template;

  if (props.route.type === "article" && isAmp) {
    template = "ArticleAMP";
  }

  useEffect(() => {
    // publisher page views counter integration
    if (props.route.type === "article") {
      sendPageView(props.route.id);
      localforage.getItem("readArticles").then((articles) => {
        if (!articles) articles = [];
        // making sure that there are not too many items
        if (articles.length > 50) articles.splice(0, 25);

        articles.push(props.data.id);
        // removing duplicates with Set
        articles = [...new Set(articles)];

        localforage.setItem("readArticles", articles);
      });
    } else {
      // saving previous route type to know where user came from
      localforage.setItem("prevRouteType", {
        type: "page",
        kind: "collection",
      });
    }
  }, [props.route]);

  return isAmp ? (
    renderer(template)
  ) : (
    <BaseLayout>{renderer(template)}</BaseLayout>
  );
};

export async function getStaticProps(context) {
  const menus = await getMenus();
  let route = await matchRoute(context.params.slug, context);
  let incomingUri = "/" + context.params.slug.join("/");

  route = { incomingUri: incomingUri, ...route };

  let template = "NotFound";
  let data = {};

  if (
    route.type === "collection" &&
    (!route.template_name ||
      route.template_name === default_collection_template)
  ) {
    template = "Collection";
  } else if (
    route.type === "collection" &&
    route.template_name &&
    route.template_name !== default_collection_template
  ) {
    template = route.template_name;
  } else if (route.type === "content" && !route.template_name) {
    template = "Content";
  } else if (route.type === "content" && route.template_name) {
    template = route.template_name;
  } else if (
    route.type === "article" &&
    (!route.swp_route.articles_template_name ||
      route.swp_route.articles_template_name === default_article_template)
  ) {
    template = "Article";
  } else if (
    route.type === "article" &&
    route.swp_route.articles_template_name &&
    route.swp_route.articles_template_name !== default_article_template
  ) {
    template = route.swp_route.articles_template_name;
  } else if (route.type === "custom" && route.template_name) {
    template = route.template_name;
  }

  if (
    typeof components[template] !== "undefined" &&
    typeof components[template].getProps !== "undefined"
  ) {
    // route.id is actually content id. It is route.id for section but article.id for article
    data = await components[template].getProps(context, route.id);
  }

  return {
    props: {
      menus: menus,
      route: route,
      data: data,
      template: template,
    },
    revalidate: 60,
  };
}

// getting paths to prerender articles html/json on build
export async function getStaticPaths() {
  const paths = await getPaths();

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const config = { amp: "hybrid" };

export default Pages;
