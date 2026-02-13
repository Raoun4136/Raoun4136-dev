'use client';

import type { ReactNode } from 'react';

type AppFrameProps = {
  children: ReactNode;
};

export default function AppFrame({ children }: AppFrameProps) {
  return (
    <main className="flex h-dvh flex-col items-center overflow-hidden px-3 pb-10 pt-5 md:px-5 md:pb-8 md:pt-9">
      <div className="flex h-full w-full max-w-5xl flex-col rounded-[1.7rem] border border-border/65 bg-[linear-gradient(170deg,hsl(var(--background)),hsl(var(--muted)/0.62))] p-3 shadow-[0_40px_80px_-44px_hsl(var(--foreground)/0.68)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-border/70 bg-background/94 shadow-[inset_0_1px_0_hsl(var(--background))]">
          <div className="flex h-11 items-center border-b border-border/65 bg-gradient-to-b from-muted/45 to-background/90 px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-foreground/20 bg-[#ff6b62]/70" />
              <span className="h-2.5 w-2.5 rounded-full border border-foreground/20 bg-[#f7be49]/70" />
              <span className="h-2.5 w-2.5 rounded-full border border-foreground/20 bg-[#61cb5a]/70" />
            </div>
          </div>

          <div
            data-app-scroll-container
            className="flex-1 overflow-y-auto px-5 pb-9 pt-6 md:px-9 md:pb-12 md:pt-10"
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
