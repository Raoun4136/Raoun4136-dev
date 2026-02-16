'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  AtSign,
  BookOpenText,
  Github,
  House,
  Instagram,
  Linkedin,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  NotebookText,
  PenSquare,
  Rss,
  User,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouterPath } from '@/components/lib/constant';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

type DockLink = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  target?: '_blank';
};

type StudioAuthStatus = {
  enabled: boolean;
  isAuthenticated: boolean;
};

const PRIMARY_LINKS: DockLink[] = [
  { href: RouterPath.HOME, icon: House, label: 'Home' },
  { href: RouterPath.POSTS, icon: BookOpenText, label: 'Posts' },
  { href: RouterPath.NOTES, icon: NotebookText, label: 'Notes' },
];

const EXTRA_LINKS: DockLink[] = [
  { href: RouterPath.ABOUT, icon: User, label: 'About' },
  { href: RouterPath.GUESTBOOK, icon: MessageCircle, label: 'Guestbook' },
  { href: '/feed.xml', icon: Rss, label: 'RSS', target: '_blank' },
];

const SOCIAL_LINKS: DockLink[] = [
  { href: 'mailto:qkrtjddh1212@naver.com', icon: AtSign, label: 'Email' },
  { href: 'https://github.com/Raoun4136', icon: Github, label: 'GitHub', target: '_blank' },
  { href: 'https://www.instagram.com/park__55555/', icon: Instagram, label: 'Instagram', target: '_blank' },
  { href: 'https://www.linkedin.com/in/raoun4136/', icon: Linkedin, label: 'LinkedIn', target: '_blank' },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === RouterPath.HOME) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function FloatingNavDock() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studioAuth, setStudioAuth] = useState<StudioAuthStatus>({
    enabled: false,
    isAuthenticated: false,
  });
  const dockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const controller = new AbortController();

    const loadStudioStatus = async () => {
      try {
        const response = await fetch('/api/studio/auth/status', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) return;
        const data = (await response.json()) as StudioAuthStatus;
        if (controller.signal.aborted) return;
        setStudioAuth({
          enabled: Boolean(data.enabled),
          isAuthenticated: Boolean(data.isAuthenticated),
        });
      } catch {
        // Ignore request failures and keep studio controls hidden.
      }
    };

    void loadStudioStatus();
    return () => controller.abort();
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.mode-toggle-popover')) return;
      if (!dockRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handleOutsidePointer);
    return () => window.removeEventListener('pointerdown', handleOutsidePointer);
  }, [isMenuOpen]);

  const studioNextPath = pathname || '/';
  const studioLoginHref = `/studio/login?next=${encodeURIComponent(studioNextPath)}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <motion.div
        ref={dockRef}
        initial={{ opacity: 0, y: 14, scaleX: 0.74, scaleY: 0.92 }}
        animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '50% 100%' }}
        className="pointer-events-auto relative flex items-center gap-1 rounded-[1.4rem] border border-border/70 bg-background/78 p-1.5 shadow-[0_24px_52px_-28px_hsl(var(--foreground)/0.8)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/35 to-transparent" />
        {PRIMARY_LINKS.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href);
          return (
            <motion.div key={item.href} whileHover={{ y: -2, scale: 1.14 }} whileTap={{ scale: 0.96 }}>
              <Link
                href={item.href}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                  active ? 'bg-accent text-accent-foreground' : 'text-foreground/75 hover:bg-accent/80 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}

        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.14 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full transition-all',
            isMenuOpen ? 'bg-accent text-accent-foreground' : 'text-foreground/75 hover:bg-accent/80 hover:text-foreground',
          )}
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="sr-only">Open more navigation</span>
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="absolute bottom-[calc(100%+0.75rem)] right-0 flex w-40 flex-col gap-2 rounded-2xl border border-border/70 bg-background/92 p-2 shadow-xl backdrop-blur-xl"
            >
              {EXTRA_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    rel={item.target ? 'noopener noreferrer' : undefined}
                    target={item.target}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-accent"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}

              {studioAuth.enabled && (
                <div className="border-t border-border/70 pt-2">
                  {studioAuth.isAuthenticated ? (
                    <div className="space-y-1">
                      <Link
                        href="/studio"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-accent"
                      >
                        <PenSquare className="h-4 w-4" />
                        Studio
                      </Link>
                      <form action="/api/studio/auth/logout" method="post" className="w-full">
                        <input type="hidden" name="next" value={studioNextPath} />
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                        >
                          <LogOut className="h-4 w-4" />
                          Log out
                        </button>
                      </form>
                    </div>
                  ) : (
                    <Link
                      href={studioLoginHref}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-accent"
                    >
                      <LogIn className="h-4 w-4" />
                      Studio login
                    </Link>
                  )}
                </div>
              )}

              <div className="border-t border-border/70 pt-2">
                <ModeToggle
                  align="start"
                  contentClassName="mode-toggle-popover"
                  showSelectedLabel
                  className="h-10 w-full rounded-xl border-0 bg-transparent px-3 text-sm shadow-none hover:bg-accent"
                  size="default"
                  variant="ghost"
                />
              </div>

              <div className="border-t border-border/70 pt-2">
                <div className="flex items-center justify-between">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        rel={item.target ? 'noopener noreferrer' : undefined}
                        target={item.target}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                        title={item.label}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
