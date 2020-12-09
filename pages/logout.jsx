import React, { useEffect } from "react";
import { getMenus } from "../services/menuService";
import Store from "../components/Store";
import BaseLayout from "../components/layout/BaseLayout";

const Logout = (props) => {
  useEffect(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }, []);

  return (
    <Store.Provider value={{ ...props }}>
      <BaseLayout>
        <p>Successfully logged out</p>
      </BaseLayout>
    </Store.Provider>
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
