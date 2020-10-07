import Header from "./Header";
import Footer from "./Footer";
import { getStaticProps } from "../../pages";

const BaseLayout = ({ children }) => (
  <div className="container">
    <Header />
    <main className="main">{children}</main>
    <Footer />
  </div>
);

export default BaseLayout;
