import "../styles/_index.scss";
import "intersection-observer";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useAmp } from "next/amp";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useOnlineStatus from "../hooks/useOnlineStatus";
import * as gtag from "../services/googleAnalyticsService";
import * as Sentry from "@sentry/node";

import Store from "../components/Store";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

function PublisherPwa({ Component, pageProps }) {
  const onlineStatus = useOnlineStatus();
  const isAmp = useAmp();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (sessionStorage && sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }

    if (sessionStorage && sessionStorage.getItem("user")) {
      setUser(sessionStorage.getItem("user"));
    }
  }, []);

  useEffect(() => {
    if (gtag.GA_TRACKING_ID) {
      // initial load
      gtag.pageview(router.asPath);

      // route change
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        {!isAmp && (
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        )}
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
        <meta
          name="apple-mobile-web-app-title"
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
        <meta name="msapplication-starturl" content="/" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        ></link>
        <meta name="robots" content="index,follow" />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Store.Provider
          value={{
            ...pageProps,
            isOnline: onlineStatus,
            user: user,
            token: token,
            actions: {
              setUser: setUser,
              setToken: setToken,
            },
          }}
        >
          <Component {...pageProps} />
        </Store.Provider>
      </AnimatePresence>
    </>
  );
}

export default PublisherPwa;
