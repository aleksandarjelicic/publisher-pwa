import { request } from "graphql-request";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getAuthorInfo = (authorSlug) => {
  const AUTHOR_QUERY = `
  query getAuthor($slug: String = "") {
    author: swp_author(where: {slug: {_eq: $slug}}) {
      author_media_id
      avatar_url
      biography
      facebook
      instagram
      name
      twitter
      role
    }
  }
`;

  return request(api_url, AUTHOR_QUERY, {
    slug: authorSlug
  })
    .then((data) => data.author[0] ? data.author[0] : {})
    .catch((err) => {
      console.log(err.response.errors);
      return {};
    });
};
