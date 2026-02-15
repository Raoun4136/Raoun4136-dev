'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import SearchMenu from '@/components/search-menu';
import { RouterPath } from '@/components/lib/constant';
import { NoteType, PostType } from '@/components/lib/type';
import { cn } from '@/lib/utils';

type SiteTopHeaderProps = {
  notes: { meta: NoteType; slug: string }[];
  posts: { meta: PostType; slug: string }[];
};

type Breadcrumb = {
  href: string;
  label: string;
};

const STATIC_SEGMENT_LABEL: Record<string, string> = {
  about: 'About',
  guestbook: 'Guestbook',
  notes: 'Notes',
  posts: 'Posts',
  resume: 'Resume',
};

const HOME_NAV_ITEMS = [
  { href: RouterPath.HOME, label: 'Home' },
  { href: RouterPath.POSTS, label: 'Posts' },
  { href: RouterPath.NOTES, label: 'Notes' },
  { href: RouterPath.ABOUT, label: 'About' },
  { href: RouterPath.GUESTBOOK, label: 'Guestbook' },
];

const formatSegmentLabel = (segment: string) => {
  if (STATIC_SEGMENT_LABEL[segment]) return STATIC_SEGMENT_LABEL[segment];
  return decodeURIComponent(segment).replace(/[-_]/g, ' ');
};

export default function SiteTopHeader({ notes, posts }: SiteTopHeaderProps) {
  const pathname = usePathname();

  const postTitleBySlug = useMemo(
    () => new Map(posts.map((post) => [post.slug, post.meta.title])),
    [posts],
  );
  const noteTitleBySlug = useMemo(
    () => new Map(notes.map((note) => [note.slug, note.meta.title])),
    [notes],
  );

  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs: Breadcrumb[] = [{ href: RouterPath.HOME, label: 'Home' }];

    if (segments.length === 0) return crumbs;

    let href = '';
    segments.forEach((segment, index) => {
      href += `/${segment}`;
      let label = formatSegmentLabel(segment);

      if (segments[0] === 'posts' && index === 1) {
        label = postTitleBySlug.get(segment) ?? label;
      }

      if (segments[0] === 'notes' && index === 1) {
        label = noteTitleBySlug.get(segment) ?? label;
      }

      crumbs.push({ href, label });
    });

    return crumbs;
  }, [noteTitleBySlug, pathname, postTitleBySlug]);

  const currentLabel = breadcrumbs[breadcrumbs.length - 1]?.label ?? 'Home';

  return (
    <header className="fixed inset-x-0 top-0 z-[700] border-b border-border/65 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto grid h-[var(--site-header-h)] w-full max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 sm:px-5 md:px-7">
        <div className="justify-self-start">
          <Link
            href={RouterPath.HOME}
            className="inline-flex items-center text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground"
          >
            Raoun.me
          </Link>
        </div>

        <nav className="min-w-0 w-full max-w-[52vw] justify-self-center md:max-w-none">
          <p className="block w-full truncate px-1 text-center text-xs text-foreground/68 md:hidden">
            {currentLabel}
          </p>
          {pathname === RouterPath.HOME ? (
            <ol className="hidden max-w-[min(70vw,46rem)] items-center gap-2 text-sm text-foreground/68 md:flex">
              {HOME_NAV_ITEMS.map((item, index) => (
                <li key={item.href} className="flex min-w-0 items-center gap-2">
                  <Link href={item.href} className="truncate transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                  {index < HOME_NAV_ITEMS.length - 1 && <span className="text-foreground/42">/</span>}
                </li>
              ))}
            </ol>
          ) : (
            <ol className="hidden max-w-[min(70vw,46rem)] items-center gap-2 text-sm text-foreground/68 md:flex">
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={breadcrumb.href} className="flex min-w-0 items-center gap-2">
                    {isLast ? (
                      <span className="truncate text-foreground/88">{breadcrumb.label}</span>
                    ) : (
                      <Link
                        href={breadcrumb.href}
                        className={cn('truncate transition-colors hover:text-foreground')}
                      >
                        {breadcrumb.label}
                      </Link>
                    )}
                    {!isLast && <span className="text-foreground/42">/</span>}
                  </li>
                );
              })}
            </ol>
          )}
        </nav>

        <div className="justify-self-end">
          <SearchMenu
            posts={posts}
            notes={notes}
            enableKeyboardShortcut
            triggerVariant="ghost"
            triggerSize="icon"
            triggerClassName="h-9 w-9 rounded-full border border-border/70 bg-background/75 text-foreground/82 shadow-none backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
          />
        </div>
      </div>
    </header>
  );
}
