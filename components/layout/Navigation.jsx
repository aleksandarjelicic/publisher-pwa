import React, { useContext } from "react";
import { getMenuItems } from "../../services/menuService";
import { useRouter } from "next/router";
import Store from "../Store";
import Link from "next/link";
import OnScrollNavbar from "../UI/OnScrollNavbar";

const ActiveLink = ({ href, label }) => {
  const router = useRouter();
  const indexOfPage = router.asPath.indexOf("/page");

  const asPath = router.asPath.substring(
    0,
    indexOfPage !== -1 ? indexOfPage : router.asPath.length
  );
  const linkClassName = asPath === href ? "active" : "";

  return (
    <Link href={href}>
      <a className={linkClassName}>{label}</a>
    </Link>
  );
};

const Navigation = ({ menuName }) => {
  const store = useContext(Store);
  const menuItems = getMenuItems(store.menus, menuName);

  return (
    <>
      <OnScrollNavbar offsetFromTop={500}>
        <nav className="container nav onScrollNavbarNav">
          <Link href="/">
            <a className="onScrollNavbar__logo">
              <img src="/img/logo-small.svg" width="40" alt="" />
            </a>
          </Link>
          {/* <span onClick={() => window.history.back()}>
            Click here to go back
          </span> */}

          <ul>
            {menuItems.map((item, index) => (
              <li key={menuName + "-" + index}>
                <ActiveLink
                  href={item.swp_route ? item.swp_route.staticprefix : item.uri}
                  label={item.label}
                />
              </li>
            ))}
          </ul>
        </nav>
      </OnScrollNavbar>
      <nav className="nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={menuName + "-" + index}>
              <ActiveLink
                href={item.swp_route ? item.swp_route.staticprefix : item.uri}
                label={item.label}
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
