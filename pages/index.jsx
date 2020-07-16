import { h } from "preact";
import { getMenus } from "../services/menuService";
import Store from "../components/Store";
import BaseLayout from "../components/layout/BaseLayout";

export async function getServerSideProps(context) {
  const menus = await getMenus();

  return {
    props: { menus: menus },
  };
}

const Index = (props) => {
  return (
    <Store.Provider value={{ ...props }}>
      <BaseLayout>this is index</BaseLayout>
    </Store.Provider>
  );
};

export default Index;
