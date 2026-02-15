import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
import { NoteType } from '@/components/lib/type';
import Link from 'next/link';

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

type NoteEntry = {
  meta: NoteType;
  slug: string;
};

export async function generateMetadata(props: NotePageProps, parent: ResolvingMetadata) {
  const params = await props.params;
  const parentData = await parent;

  const note = getPost(params);

  return {
    ...parentData.openGraph,
    title: note.frontMatter.title,
    description: (note.frontMatter.description ?? '') + (note.content?.slice(0, 100) ?? '') + '...',
    alternates: {
      canonical: `/notes/${params.slug}`,
    },
    openGraph: {
      ...parentData.openGraph,
      url: `/notes/${params.slug}`,
    },
  };
}

function getPost({ slug }: { slug: string }) {
  let markdownFile;
  try {
    markdownFile = fs.readFileSync(path.join('src/mdx/notes', slug + '.mdx'), 'utf-8');
  } catch {
    notFound();
  }
  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter: frontMatter as NoteType,
    slug,
    content,
  };
}

function getNoteEntries() {
  const files = fs.readdirSync(path.join('src/mdx/notes'));

  return files
    .map((filename) => {
      const fileContent = fs.readFileSync(path.join('src/mdx/notes', filename), 'utf-8');
      const { data: frontMatter } = matter(fileContent);

      return {
        meta: frontMatter as NoteType,
        slug: filename.replace('.mdx', ''),
      } satisfies NoteEntry;
    })
    .filter((note) => !note.meta.draft)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export default async function Note(props: NotePageProps) {
  const params = await props.params;
  const note = getPost(params);
  const notes = getNoteEntries();
  const currentIndex = notes.findIndex((entry) => entry.slug === params.slug);

  if (currentIndex === -1) notFound();

  const previousNote = notes[currentIndex + 1];
  const nextNote = notes[currentIndex - 1];

  return (
    <article>
      <section className="mb-12 text-opacity-90">
        <h1 className="text-md font-semibold">{note.frontMatter.title}</h1>
        <h2 className="text-sm font-light opacity-70">{note.frontMatter.description}</h2>
        <span className="text-xs font-light opacity-70">{format(note.frontMatter.date, 'yyyy-MM-dd')}</span>
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
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  return getNoteEntries().map((note) => ({
    slug: note.slug,
  }));
}
