import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import '@/styles/mdx.css';

import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { format } from 'date-fns';
import GiscusComment from '../_ui/giscus-comment';
import { TocHighlighter } from '@/components/toc-highlighter';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import Link from 'next/link';

import { notFound } from 'next/navigation';
import { ResolvingMetadata } from 'next';
import { mdxOptions } from '@/components/lib/mdx';
import ImageZoomer from '@/components/ImageZoomer';

export async function generateMetadata(props: any, parent: ResolvingMetadata) {
  const params = await props.params;
  const parentData = await parent;

  const post = getPost(params);

  return {
    ...parentData.openGraph,
    title: post.frontMatter.title,
    description: (post.frontMatter.description ?? '') + (post.content?.slice(0, 100) ?? '') + '...',
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
    markdownFile = fs.readFileSync(path.join('src/mdx/posts', slug + '.mdx'), 'utf-8');
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

export default async function Post(props: any) {
  const params = await props.params;
  const post = getPost(params);

  return (
    <>
      <article>
        <section className="mb-12 opacity-90">
          <h1 className="text-md font-semibold">{post.frontMatter.title}</h1>
          <h2 className="text-sm font-light opacity-70">{post.frontMatter.description}</h2>
          <span className="text-xs font-light opacity-70">{format(post.frontMatter.date, 'yyyy-MM-dd')}</span>
          {post.frontMatter.outlink && (
            <Link href={post.frontMatter.outlink} target="_blank" rel="noopener noreferrer">
              <Alert className="my-6 transition-colors hover:bg-secondary/80">
                <ArrowUpRightFromSquareIcon className="h-4 w-4" />
                <AlertTitle>외부 링크 안내</AlertTitle>
                <AlertDescription className="flex items-center justify-between gap-2">
                  클릭 시 외부 페이지로 이동합니다.
                </AlertDescription>
              </Alert>
            </Link>
          )}
        </section>
        <section className="mdx">
          {await MDXRemote({ source: post.content, options: mdxOptions })}
          <ImageZoomer />
          <GiscusComment />
          <TocHighlighter />
        </section>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/mdx/posts'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}
