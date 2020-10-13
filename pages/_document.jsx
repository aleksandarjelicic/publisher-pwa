import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../services/googleAnalyticsService";

export default class SiteDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {
            /* Global Site Tag (gtag.js) - Google Analytics */
            GA_TRACKING_ID && !this.props.inAmpMode ? (
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
          {
            /*  AMP google analytics */
            GA_TRACKING_ID && this.props.inAmpMode ? (
              <>
                <script
                  async
                  custom-element="amp-analytics"
                  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
                ></script>
              </>
            ) : null
          }
        </Head>
        <body>
          <Main />
          {
            /*  AMP google analytics */
            GA_TRACKING_ID && this.props.inAmpMode ? (
              <amp-analytics type="gtag">
                <script
                  type="application/json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      vars: {
                        gtag_id: GA_TRACKING_ID,
                      },
                    }),
                  }}
                />
              </amp-analytics>
            ) : null
          }
          <NextScript />
        </body>
      </Html>
    );
  }
}
