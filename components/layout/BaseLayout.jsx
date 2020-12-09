import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { firebaseCloudMessaging } from "../../services/webPush";

const BaseLayout = ({ children }) => {
  useEffect(() => {
    firebaseCloudMessaging.init();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
