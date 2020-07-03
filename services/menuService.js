import { request } from 'graphql-request';

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getMenus = () => {

  const MENUS_QUERY = `
  query getMenus($parent_id: Int_comparison_exp = {_eq: 10}, $tenant_code: String!) {
    swp_menu(where: {tenant_code: {_eq: $tenant_code}, level: {_eq: 0}}) {
      name
      children(order_by: {position: asc}){
        label
        uri
        swp_route {
          staticprefix
        }
      }
    }
  }

`;

  return request(api_url, MENUS_QUERY, { tenant_code: tenant_code })
    .then(data => data.swp_menu)
    .catch(err => []);
};


export const getMenuItems = (menus, name) => {
  if (menus && name) {
    const menu = menus.find(menu => menu.name === name);
    if (menu) return menu.children;
  }

  return [];
};


