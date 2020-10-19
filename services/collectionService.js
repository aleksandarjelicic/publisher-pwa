import { request } from "graphql-request"
import { GET_COLLECTION_QUERY, GET_COLLECTION_BY_TAG_QUERY, GET_COLLECTION_BY_AUTHOR_QUERY } from "../graphql/queries"

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getCollectionByRoute = (routeId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  return request(api_url, GET_COLLECTION_QUERY, {
    tenant_code: tenant_code,
    routeId: routeId,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      data.metadata.aggregate.currentPage = page;
      data.metadata.aggregate.perPage = limit;
      data.metadata.aggregate.pagesCount = Math.ceil(
        data.metadata.aggregate.totalCount / limit
      );

      return data;
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};

export const getCollectionByTag = (tagSlug, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  return request(api_url, GET_COLLECTION_BY_TAG_QUERY, {
    tenant_code: tenant_code,
    tagSlug: tagSlug,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      data.metadata.aggregate.currentPage = page;
      data.metadata.aggregate.perPage = limit;
      data.metadata.aggregate.pagesCount = Math.ceil(
        data.metadata.aggregate.totalCount / limit
      );

      return data;
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};

export const getCollectionByAuthor = (authorSlug, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  return request(api_url, GET_COLLECTION_BY_AUTHOR_QUERY, {
    tenant_code: tenant_code,
    authorSlug: authorSlug,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      data.metadata.aggregate.currentPage = page;
      data.metadata.aggregate.perPage = limit;
      data.metadata.aggregate.pagesCount = Math.ceil(
        data.metadata.aggregate.totalCount / limit
      );

      return data;
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};

export const getCollectionByWhere = (where = "", limit = 10, page = 1, order = "published_at: desc") => {
  const query = buildQuery(where, order);
  const offset = (page - 1) * limit;

  return request(api_url, query, {
    tenant_code: tenant_code,
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      data.metadata.aggregate.currentPage = page;
      data.metadata.aggregate.perPage = limit;
      data.metadata.aggregate.pagesCount = Math.ceil(
        data.metadata.aggregate.totalCount / limit
      );

      return data;
    })
    .catch((err) => {
      if (err && err.response) console.log(err.response.errors);
      return { metadata: { aggregate: {} }, items: [] };
    });
};

const buildQuery = (where, order) => {
  let newWhere = '{tenant_code: {_eq: $tenant_code}}';
  if (where.length) {
    newWhere = `{tenant_code: {_eq: $tenant_code}, ${where}}`
  }

  return `
  query getArticles($tenant_code: String = "", $limit: Int = 10, $offset: Int = 0) {
    metadata: swp_article_aggregate(where: ${newWhere}) {
      aggregate {
        totalCount: count
      }
    }
    items: swp_article(limit: $limit, offset: $offset, order_by: {${order}}, where: ${newWhere}) {
      comments_count
      lead
      paywall_secured
      published_at
      slug
      title
      swp_article_authors {
        swp_author {
          name
          role
          avatar_url
        }
      }
      swp_article_feature_media {
        renditions: swp_image_renditions {
          name
          width
          height
          image: swp_image {
            asset_id
            file_extension
            variants

          }
        }
      }
      swp_slideshows {
        id
      }
      swp_route {
        staticprefix
      }
    }
  }
`;
}
