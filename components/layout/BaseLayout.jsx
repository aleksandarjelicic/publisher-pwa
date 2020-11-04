import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { firebaseCloudMessaging } from "../../services/webPush";

const BaseLayout = ({ children }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIREBASE_SENDERID) {
      firebaseCloudMessaging.init();
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
