import { getMenus } from "../services/menuService";
import Store from "../components/Store";
import BaseLayout from "../components/layout/BaseLayout";
import Homepage from "../components/templates/Homepage";

const Index = (props) => {
  return (
    <Store.Provider value={{ ...props }}>
      <BaseLayout>
        <Homepage />
      </BaseLayout>
    </Store.Provider>
  );
};

export async function getStaticProps(context) {
  const menus = await getMenus();
  let data = {};

  if (typeof Homepage.getProps !== "undefined") {
    data = await Homepage.getProps(context);
  }

  return {
    props: { menus: menus, data: data },
    revalidate: 1,
  };
}

export default Index;
