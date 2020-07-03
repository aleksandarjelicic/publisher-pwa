import Header from "./Header";
import Footer from "./Footer";

const BaseLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default BaseLayout;
