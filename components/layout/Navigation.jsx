import React, { useContext } from "react";
import { getMenuItems } from "../../services/menuService";
import { useRouter } from "next/router";
import Store from "../Store";
import Link from "next/link";

const ActiveLink = ({ href, label }) => {
  const router = useRouter();
  const indexOfQuestionMark = router.asPath.indexOf("?");
  const asPath = router.asPath.substring(
    0,
    indexOfQuestionMark !== -1 ? indexOfQuestionMark : router.asPath.length
  );
  const linkClassName = asPath === href ? "active" : "";

  return (
    <Link href="/[...slug]" as={href}>
      <a className={linkClassName}>{label}</a>
    </Link>
  );
};

const Navigation = ({ menuName }) => {
  const store = useContext(Store);
  const menuItems = getMenuItems(store.menus, menuName);

  return (
    <ul className="nav">
      {menuItems.map((item, index) => (
        <li key={menuName + "-" + index}>
          <ActiveLink
            href={item.swp_route ? item.swp_route.staticprefix : item.uri}
            label={item.label}
          />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
