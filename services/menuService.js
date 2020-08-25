import { request } from "graphql-request";
import { GET_MENUS_QUERY } from "../graphql/queries";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const tenant_code = process.env.NEXT_PUBLIC_TENANT_CODE;

export const getMenus = () => {
  return request(api_url, GET_MENUS_QUERY, { tenant_code: tenant_code })
    .then((data) => data.swp_menu)
    .catch((err) => []);
};

export const getMenuItems = (menus, name) => {
  if (menus && name) {
    const menu = menus.find((menu) => menu.name === name);
    if (menu) return menu.children;
  }

  return [];
};
