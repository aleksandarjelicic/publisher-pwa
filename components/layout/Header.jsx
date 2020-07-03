import { h } from "preact";
import Navigation from "../Navigation";

const Header = () => {
  return (
    <div>
      <h4>this is header</h4>
      <Navigation menuName="mainNavigation" />
    </div>
  );
};

export default Header;
