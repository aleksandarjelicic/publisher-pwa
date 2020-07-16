import { h } from "preact";
import { getMenus } from "../services/menuService";
import { matchRoute } from "../services/routeMatcherService";
import Store from "../components/Store";

import Article from "../components/templates/Article/Article";
import Collection from "../components/templates/Collection/Collection";
import Content from "../components/templates/Content/Content";
import NotFound from "../components/templates/NotFound";
import SectionCustomTemplate from "../components/templates/Collection/SectionCustomTemplate";

import BaseLayout from "../components/layout/BaseLayout";

const default_collection_template = "category.html.twig";
const default_article_template = "article.html.twig";

const components = {
  Article: Article,
  Collection: Collection,
  Content: Content,
  NotFound: NotFound,
  SectionCustomTemplate: SectionCustomTemplate,
};

const renderer = (templateName) => {
  if (typeof components[templateName] !== "undefined") {
    return h(components[templateName]);
  }
  return h(() => <div>Template '{templateName}' not found.</div>);
};

const Pages = (props) => {
  return (
    <Store.Provider value={{ ...props }}>
      <BaseLayout>{renderer(props.template)}</BaseLayout>
    </Store.Provider>
  );
};

Pages.getInitialProps = async (context) => {
  const menus = await getMenus();
  let route = await matchRoute(context.query.slug, context);
  route = { incomingUri: context.query.slug, ...route };

  let template = "NotFound";
  let data = {};

  if (
    route.type === "collection" &&
    route.template_name === default_collection_template
  ) {
    template = "Collection";
  } else if (
    route.type === "collection" &&
    route.template_name !== default_collection_template
  ) {
    template = route.template_name;
  } else if (route.type === "content" && !route.template_name) {
    template = "Content";
  } else if (route.type === "content" && route.template_name) {
    template = route.template_name;
  } else if (
    route.type === "article" &&
    route.swp_route.article_template_name === default_article_template
  ) {
    template = "Article";
  } else if (
    route.type === "article" &&
    route.swp_route.article_template_name !== default_article_template
  ) {
    template = route.swp_route.article_template_name;
  } else if (route.type === "custom" && route.template_name) {
    template = route.template_name;
  }

  if (
    typeof components[template] !== "undefined" &&
    typeof components[template].getInitialProps !== "undefined"
  ) {
    data = await components[template].getInitialProps(context, route);
  }

  return {
    menus: menus,
    route: route,
    data: data,
    template: template,
  };
};

export default Pages;
