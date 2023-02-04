import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
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
