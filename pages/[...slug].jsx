import React, { useEffect } from "react";
import { useAmp } from "next/amp";
import { getMenus } from "../services/menuService";
import { matchRoute } from "../services/routeMatcherService";
import { sendPageView } from "../services/publisherAnalytics";
import { getPaths } from "../services/buildService";
import Store from "../components/Store";

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

  useEffect(() => {
    // publisher page views counter integration
    if (props.route.type === "article") sendPageView(props.route.id);
  }, [props.route]);

  return (
    <Store.Provider value={{ ...props }}>
      {isAmp ? (
        renderer(props.template)
      ) : (
        <BaseLayout>{renderer(props.template)}</BaseLayout>
      )}
    </Store.Provider>
  );
};

export async function getStaticProps(context) {
  const _isAmp = context.params.amp ? true : false;
  const menus = await getMenus();
  let route = await matchRoute(context.params.slug, context);
  let incomingUri = "/" + context.params.slug.join("/");
  if (_isAmp) incomingUri += "?amp=1";
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
    if (_isAmp) template = "ArticleAMP";
  } else if (
    route.type === "article" &&
    route.swp_route.articles_template_name &&
    route.swp_route.articles_template_name !== default_article_template
  ) {
    template = route.swp_route.articles_template_name;
    if (_isAmp) template = "ArticleAMP";
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
    props: { menus: menus, route: route, data: data, template: template },
    revalidate: 1,
  };
}

// getting paths to prerender articles html/json on build
export async function getStaticPaths() {
  const paths = await getPaths();

  return {
    paths: paths,
    fallback: "unstable_blocking",
  };
}

export const config = { amp: "hybrid" };

export default Pages;
