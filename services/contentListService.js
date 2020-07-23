import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getContentList = (name, limit = 1000) => {
  const CONTENTLISTITEMS_QUERY = `
  query getArticles($listName: String = "", $limit: Int = 1000, $tenant_code: String= "") {
    list: swp_content_list(where: {name: {_ilike: $listName}, tenant_code: {_eq: $tenant_code}}) {
      name
      items: swp_content_list_items(limit: $limit, order_by: {position: desc}) {
        article: swp_article {
          comments_count
          feature_media
          lead
          published_at
          title
          slug
          swp_route {
            staticprefix
          }
        }
      }
    }
  }
`;

  return request(api_url, CONTENTLISTITEMS_QUERY, {
    tenant_code: tenant_code,
    listName: name,
    limit: limit
  })
    .then((data) => {
      return data.list[0];
    })
    .catch((err) => {
      console.log(err.response.errors);
      return {};
    });
};
