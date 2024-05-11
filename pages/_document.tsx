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
        {/* Naver Search Advisor */}
        <meta
          name="naver-site-verification"
          content="a86b2f1dbcae85a65adac50bd181de3cb7d853d0"
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
