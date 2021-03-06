import React, { useEffect, useContext } from "react";
import { getMenus } from "../services/menuService";
import Store from "../components/Store";
import BaseLayout from "../components/layout/BaseLayout";

const Logout = (props) => {
  const store = useContext(Store);

  useEffect(() => {
    store.actions.setUser(null);
    store.actions.setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }, []);

  return (
    <BaseLayout>
      <p>Successfully logged out</p>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const menus = await getMenus();

  return {
    props: { menus: menus },
    revalidate: 360,
  };
}

export default Logout;
