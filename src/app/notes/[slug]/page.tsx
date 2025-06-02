import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import '@/styles/mdx.css';

import { EvaluateOptions, MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import { format } from 'date-fns';
import GiscusComment from '../_ui/giscus-comment';
import { TocHighlighter } from '@/components/toc-highlighter';

import { notFound } from 'next/navigation';
import { ResolvingMetadata } from 'next';
import { mdxOptions } from '@/components/lib/mdx';

export async function generateMetadata(props: any, parent: ResolvingMetadata) {
  const params = await props.params;
  const parentData = await parent;

  const note = getPost(params);

  return {
    ...parentData.openGraph,
    title: note.frontMatter.title,
    description: (note.frontMatter.description ?? '') + (note.content?.slice(0, 100) ?? '') + '...',
    alternates: {
      canonical: `/posts/${params.slug}`,
    },
    openGraph: {
      ...parentData.openGraph,
      url: `/posts/${params.slug}`,
    },
  };
}

function getPost({ slug }: { slug: string }) {
  let markdownFile;
  try {
    markdownFile = fs.readFileSync(path.join('src/mdx/notes', slug + '.mdx'), 'utf-8');
  } catch (e) {
    notFound();
  }
  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default async function Note(props: any) {
  const params = await props.params;
  const note = getPost(params);

  return (
    <article>
      <section className="mb-12 text-opacity-90">
        <h1 className="text-md font-semibold">{note.frontMatter.title}</h1>
        <h2 className="text-sm font-light opacity-70">{note.frontMatter.description}</h2>
        <span className="text-xs font-light opacity-70">{format(note.frontMatter.date, 'yyyy-MM-dd')}</span>
      </section>
      <section className="mdx">
        {await MDXRemote({ source: note.content, options: mdxOptions })}
        <GiscusComment />
        <TocHighlighter />
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/mdx/notes'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}
