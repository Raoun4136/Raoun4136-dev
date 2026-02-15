import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Noto_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@next/third-parties/google';

import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { CommonMetaData } from '@/components/lib/constant';
import useNote from '@/app/notes/_hook/useNote';
import usePost from '@/app/posts/_hook/usePost';
import FloatingNavDock from '@/components/floating-nav-dock';
import AppFrame from '@/components/app-frame';
import SiteTopHeader from '@/components/site-top-header';

const sans = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  variable: '--font-sans',
  weight: '100 900',
});

const serif = Noto_Serif({
  subsets: ['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext'],
  variable: '--font-serif',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  ...CommonMetaData,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = usePost();
  const notes = useNote();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn('min-h-dvh bg-background font-sans antialiased', sans.variable, serif.variable, mono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteTopHeader posts={posts} notes={notes} />
          <AppFrame>{children}</AppFrame>
          <FloatingNavDock />
        </ThemeProvider>

        <Analytics />
        {/* Google Analytics 설정 */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />

        {/* Naver Analytics 설정 */}
        <Script strategy="beforeInteractive" src="//wcs.naver.net/wcslog.js" />
        <Script id="wcs" strategy="afterInteractive">
          {`
            if (!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "${process.env.NEXT_PUBLIC_NAVER_WA_ID}";
            if (window.wcs) {
              wcs_do();
            }
          `}
        </Script>

        {/* Umami Analytics 설정 */}
        <Script
          id="umami"
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
