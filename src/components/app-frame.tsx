'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type AppFrameProps = {
  children: ReactNode;
};

export default function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isStudio = pathname.startsWith('/studio');

  return (
    <main
      className={cn(
        'relative w-full overflow-x-clip bg-[radial-gradient(circle_at_10%_18%,hsl(var(--secondary))_0%,transparent_42%),radial-gradient(circle_at_86%_8%,hsl(var(--accent)/0.28)_0%,transparent_44%),radial-gradient(circle_at_50%_88%,hsl(var(--muted)/0.78)_0%,transparent_56%),hsl(var(--background))]',
        isHome ? 'h-dvh overflow-y-clip' : 'min-h-dvh',
      )}
    >
      <div
        className={cn(
          'w-full',
          isStudio
            ? 'mx-auto min-h-[calc(100dvh-var(--site-header-h))] max-w-[1600px] px-3 pt-[calc(var(--site-header-h)+0.7rem)] pb-24 sm:px-5 md:px-7 md:pt-[calc(var(--site-header-h)+0.9rem)]'
            : isHome
              ? 'h-full pt-[var(--site-header-h)]'
              : 'mx-auto min-h-[calc(100dvh-var(--site-header-h))] max-w-[1024px] px-3 pt-[calc(var(--site-header-h)+0.5rem)] pb-24 sm:px-5 md:px-7 md:pt-[calc(var(--site-header-h)+0.9rem)]',
        )}
      >
        {children}
      </div>
    </main>
  );
}
