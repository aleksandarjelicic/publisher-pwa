import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../services/googleAnalyticsService";

export default class SiteDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {
            /* Global Site Tag (gtag.js) - Google Analytics */
            GA_TRACKING_ID ? (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                  }}
                />
              </>
            ) : null
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
