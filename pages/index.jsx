import React, { useEffect } from "react";
import localforage from "localforage";
import { getMenus } from "../services/menuService";
import BaseLayout from "../components/layout/BaseLayout";
import Homepage from "../components/templates/Homepage";

const Index = (props) => {
  useEffect(() => {
    // saving previous route to know where user came from
    localforage.setItem("prevRouteType", { type: "page", kind: "homepage" });
  }, [props.route]);

  return (
    <BaseLayout>
      <Homepage />
    </BaseLayout>
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
    revalidate: 30,
  };
}

export default Index;
