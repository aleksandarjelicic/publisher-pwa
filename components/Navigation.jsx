import { h } from "preact";
import { getMenuItems } from "../services/menuService";
import { useContext } from "preact/hooks";
import Store from "./Store";

import Link from "next/link";

const Navigation = ({ menuName }) => {
  const store = useContext(Store);
  const menuItems = getMenuItems(store.menus, menuName);

  return (
    <ul className="nav">
      {menuItems.map((item) => (
        <li>
          <Link
            href="[...slug]"
            as={item.swp_route ? item.swp_route.staticprefix : item.uri}
          >
            <a>{item.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
