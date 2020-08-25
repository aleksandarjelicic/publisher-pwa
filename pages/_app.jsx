import "../styles/_index.sass";
import "intersection-observer";
import Head from "next/head";
import { useAmp } from "next/amp";

function MyApp({ Component, pageProps }) {
  const isAmp = useAmp();
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
