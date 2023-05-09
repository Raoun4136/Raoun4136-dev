import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import * as gtag from '../lib/gtag';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="8NuhoMSBYXjVe2TMpT5-FjmE0gBU_Os-pwNfUpHgRdo"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="beforeInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          id="gtag-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        {/* Theme Mode - Dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  function getThemeMode() {
                    const theme = window.localStorage.getItem('theme')
                    return theme ? theme : 'dark'
                  }
                  document.body.dataset.theme = getThemeMode()
                  `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
