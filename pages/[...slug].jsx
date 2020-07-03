import Head from "next/head";
import Csr from "../components/Csr";
import BaseLayout from "../components/layout/BaseLayout";

import { getMenus } from "../services/menuService";
import Store from "../components/Store";

export async function getServerSideProps(context) {
  const menus = await getMenus();

  return {
    props: { menus: menus }, // will be passed to the page component as props
  };
}

const Pages = (props) => {
  return (
    <Store.Provider value={{ ...props }}>
      <BaseLayout>
        <Csr />
      </BaseLayout>
    </Store.Provider>
  );
};

export default Pages;
