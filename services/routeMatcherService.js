import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const matchRoute = async (slug, context) => {
  const ROUTE_QUERY = `
  query matchRoute($tenant_code: String!, $slug: String!, $staticprefix: String!, $staticprefix_noslug: String!) {
    redirect: swp_redirect_route(where: {staticprefix: {_eq: $staticprefix}, tenant_code: {_eq: $tenant_code}}) {
      route_target_id
      uri
      swp_route_target {
        staticprefix
      }
      permanent
    }
    route: swp_route(where: {staticprefix: {_eq: $staticprefix}, tenant_code: {_eq: $tenant_code}}) {
      name
      type
      id
      template_name
    }
    customRoute: swp_route(where: {staticprefix: {_eq: $staticprefix_noslug}, tenant_code: {_eq: $tenant_code}}) {
      name
      type
      id
      template_name
    }
    article: swp_article(where: {slug: {_eq: $slug}, tenant_code: {_eq: $tenant_code}}) {
      id
      swp_route {
        articles_template_name
      }
    }
  }

  `;

  let url = "/" + slug.join("/");
  let urlNoSlug =
    slug.length > 1 ? "/" + slug.slice(0, -1).join("/") : "/" + slug.join("/");
  let articleSlug = slug[slug.length - 1];

  const response = await request(api_url, ROUTE_QUERY, {
    tenant_code: tenant_code,
    staticprefix: url,
    staticprefix_noslug: urlNoSlug,
    slug: articleSlug,
  })
    .then((data) => data)
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { redirect: [], route: [], customRoute: [], article: [] };
    });

  if (response.redirect.length) {
    let redirect = response.redirect[0];
    let newUrl = redirect.uri;

    if (redirect.swp_route_target) {
      newUrl = redirect.swp_route_target.staticprefix;
    }

    if (context.res) {
      context.res.writeHead(redirect.permanent ? 301 : 302, {
        Location: newUrl,
      });
      context.res.end();
    }

    return { type: "404" };
  } else if (response.route.length) {
    return response.route[0];
  } else if (response.article.length) {
    return { type: "article", ...response.article[0] };
  } else if (response.customRoute.length) {
    return response.customRoute[0];
  }

  return { type: "404" };
};
