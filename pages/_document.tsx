import { Html, Head, Main, NextScript } from 'next/document';

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
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        function getThemeMode() {
                          const theme = window.localStorage.getItem('theme')
                          return theme ? theme : 'dark'
                        }
                        document.body.dataset.theme = getThemeMode()
                        `,
          }}
        />
      </body>
    </Html>
  );
}
