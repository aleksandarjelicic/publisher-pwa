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

Index.getInitialProps = async (context) => {
  const menus = await getMenus();
  let data = {};

  if (typeof Homepage.getInitialProps !== "undefined") {
    data = await Homepage.getInitialProps(context);
  }

  return {
    menus: menus,
    data: data,
  };
};

export default Index;
