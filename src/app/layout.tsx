import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Noto_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@next/third-parties/google';

import { cn } from '@/components/lib/utils';
import LinkButton from '@/components/link-button';
import { ModeToggle } from '@/components/mode-toggle';
import { Rss, User } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { CommonMetaData } from '@/components/lib/constant';

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
  return (
    <html lang="ko">
      <body
        className={cn('min-h-dvh bg-background font-sans antialiased', sans.variable, serif.variable, mono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex h-full flex-col items-center justify-between px-4 py-12">
            <div className="mb-16 mt-8 w-full max-w-2xl">{children}</div>
          </main>
          <footer className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center gap-2 bg-gradient-to-t from-white via-white pb-3 dark:from-black dark:via-black">
            <LinkButton href="/about" variant="outline" size="icon">
              <User className='dark:scale-0" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
              <span className="sr-only">About Me</span>
            </LinkButton>

            <ModeToggle />

            <LinkButton href="/feed.xml" target="_blank" variant="outline" size="icon">
              <Rss className='dark:scale-0" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
              <span className="sr-only">Feed Link</span>
            </LinkButton>
          </footer>
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
