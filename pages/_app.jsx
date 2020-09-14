import "../styles/_index.scss";
import "intersection-observer";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useAmp } from "next/amp";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../services/googleAnalyticsService";

function MyApp({ Component, pageProps }) {
  const isAmp = useAmp();
  const router = useRouter();

  useEffect(() => {
    if (gtag.GA_TRACKING_ID) {
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
        <meta name="theme-color" content="#3367D6" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index,follow" />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
