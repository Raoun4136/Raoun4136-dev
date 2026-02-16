import '@/styles/mdx.css';

import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { format } from 'date-fns';
import GiscusComment from '@/components/giscus-comment';
import { TocHighlighter } from '@/components/toc-highlighter';

import { notFound } from 'next/navigation';
import { ResolvingMetadata } from 'next';
import { mdxOptions } from '@/components/lib/mdx';
import ImageZoomer from '@/components/ImageZoomer';
import { MdxEntranceMotion } from '@/components/mdx-entrance-motion';
import Link from 'next/link';
import JsonLd from '@/components/json-ld';
import { CommonMetaData } from '@/components/lib/constant';
import { getNoteBySlug, getNoteEntries } from '@/db/queries/contents';
import ContentViewTracker from '@/components/content-view-tracker';
import { StudioEditContentButton } from '@/components/studio/studio-entry-actions';
import { isVercelProduction } from '@/lib/runtime-env';

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: NotePageProps, parent: ResolvingMetadata) {
  const params = await props.params;
  const parentData = await parent;

  const note = await getNoteBySlug(params.slug);
  if (!note) return {};

  return {
    ...parentData.openGraph,
    title: note.meta.title,
    description: (note.meta.description ?? '') + (note.content?.slice(0, 100) ?? '') + '...',
    alternates: {
      canonical: `/notes/${params.slug}`,
    },
    openGraph: {
      ...parentData.openGraph,
      url: `/notes/${params.slug}`,
    },
  };
}

export default async function Note(props: NotePageProps) {
  const params = await props.params;
  const note = await getNoteBySlug(params.slug);
  const notes = await getNoteEntries();

  if (!note) notFound();

  const currentIndex = notes.findIndex((entry) => entry.slug === params.slug);

  if (currentIndex === -1) notFound();

  const previousNote = notes[currentIndex + 1];
  const nextNote = notes[currentIndex - 1];
  const siteUrl = CommonMetaData.metadataBase.toString().replace(/\/$/, '');
  const pageUrl = new URL(`/notes/${params.slug}`, CommonMetaData.metadataBase).toString();
  const publishedAt = new Date(note.meta.date).toISOString();
  const noteMetaLine = [
    format(note.meta.date, 'yyyy-MM-dd'),
    note.meta.readTimeMin ? `${note.meta.readTimeMin}분` : null,
    `조회 ${note.meta.viewCount ?? 0}`,
  ]
    .filter(Boolean)
    .join(' · ');
  const noteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: note.meta.title,
    description: note.meta.description ?? '',
    datePublished: publishedAt,
    dateModified: new Date(note.meta.update ?? note.meta.date).toISOString(),
    inLanguage: 'ko-KR',
    articleSection: 'Notes',
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: '박성오',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Raoun.me',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/og-image.png`,
      },
    },
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    url: pageUrl,
  };

  return (
    <>
      <JsonLd id={`note-jsonld-${params.slug}`} data={noteJsonLd} />
      <article>
        <section className="mb-12 text-opacity-90">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-md font-semibold">{note.meta.title}</h1>
              <h2 className="text-sm font-light opacity-70">{note.meta.description}</h2>
              <span className="text-xs font-light opacity-70">{noteMetaLine}</span>
            </div>
            <StudioEditContentButton contentId={note.id} />
          </div>
        </section>
        <section className="mdx" data-motion-state="pending">
          {await MDXRemote({ source: note.content, options: mdxOptions })}
          <nav className="mt-12 grid grid-cols-2 gap-3 border-t pt-6">
            {previousNote ? (
              <Link
                href={`/notes/${previousNote.slug}`}
                className="group flex min-h-24 flex-col justify-between rounded-lg border border-border/70 px-4 py-3 transition-colors hover:bg-secondary/50"
              >
                <span className="text-xs opacity-70">이전 노트</span>
                <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:underline">{previousNote.meta.title}</p>
              </Link>
            ) : (
              <div
                aria-hidden
                className="min-h-24 rounded-lg border border-border/40 bg-secondary/10 opacity-50"
              />
            )}
            {nextNote ? (
              <Link
                href={`/notes/${nextNote.slug}`}
                className="group flex min-h-24 flex-col justify-between rounded-lg border border-border/70 px-4 py-3 text-right transition-colors hover:bg-secondary/50"
              >
                <span className="text-xs opacity-70">다음 노트</span>
                <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:underline">{nextNote.meta.title}</p>
              </Link>
            ) : (
              <div
                aria-hidden
                className="min-h-24 rounded-lg border border-border/40 bg-secondary/10 opacity-50"
              />
            )}
          </nav>
          <MdxEntranceMotion />
          <ImageZoomer />
          <GiscusComment />
          <TocHighlighter />
          <ContentViewTracker type="note" slug={params.slug} enabled={isVercelProduction} />
        </section>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const notes = await getNoteEntries();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}
