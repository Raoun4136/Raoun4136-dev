import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

import { cn } from '@/lib/utils';
import LinkButton from '@/components/link-button';
import { ModeToggle } from '@/components/mode-toggle';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

const sans = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raoun.me'),
  title: {
    template: '%s | Raoun.me',
    default: 'Raoun.me',
  },
  description: 'Become a better developer',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/images/og-image.png',
    type: 'website',
  },
  verification: {
    other: {
      'naver-site-verification': 'a86b2f1dbcae85a65adac50bd181de3cb7d853d0',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', sans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm">
              <Link
                href="/"
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"
              >
                <code className="font-mono font-bold">Raoun.me</code>
              </Link>
              <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center gap-2 bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
                <ModeToggle />

                <LinkButton href="https://github.com/Raoun4136" target="_blank" variant="outline" size="icon">
                  <Github className='dark:scale-0" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
                  <span className="sr-only">Github Link</span>
                </LinkButton>
              </div>
            </div>
            {children}
          </main>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
