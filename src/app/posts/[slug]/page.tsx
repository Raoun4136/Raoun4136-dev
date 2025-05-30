import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import '@/styles/mdx.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
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
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import LinkButton from '@/components/link-button';
import Link from 'next/link';
import { AlertCircleIcon, ArrowUpRightFromSquareIcon } from 'lucide-react';

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(path.join('src/mdx/posts', slug + '.mdx'), 'utf-8');

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Post({ params }: any) {
  const props = getPost(params);

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkBreaks],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
            },
          },
        ],
        [
          rehypeToc,
          {
            headings: ['h1', 'h2', 'h3'],
          },
        ],
        [
          rehypeExternalLinks,
          {
            properties: {
              class: 'external-link',
            },
            target: '_blank',
            rel: ['noopener noreferrer'],
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: false,
          },
        ],
      ],
    },
  };

  return (
    <>
      <article>
        <section className="mb-12 opacity-90">
          <h1 className="text-md font-semibold">{props.frontMatter.title}</h1>
          <h2 className="text-sm font-light opacity-70">{props.frontMatter.description}</h2>
          <span className="text-xs font-light opacity-70">{format(props.frontMatter.date, 'yyyy-MM-dd')}</span>
          {props.frontMatter.outlink && (
            <Link href={props.frontMatter.outlink} target="_blank" rel="noopener noreferrer">
              <Alert className="my-6 transition-colors hover:bg-secondary/80">
                <ArrowUpRightFromSquareIcon size={16} className="h-4 w-4" />
                <AlertTitle>외부 링크 안내</AlertTitle>
                <AlertDescription className="flex items-center justify-between gap-2">
                  클릭 시 외부 페이지로 이동합니다.
                </AlertDescription>
              </Alert>
            </Link>
          )}
        </section>
        <section className="mdx">
          <MDXRemote source={props.content} options={options as any} />
          <GiscusComment />
          <TocHighlighter />
        </section>
      </article>
    </>
  );
}

export async function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    title: `${blog.frontMatter.title}`,
    description: (blog.frontMatter.description ?? '') + (blog.content?.slice(0, 100) ?? '') + '...',
    alternates: {
      canonical: `/posts/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/mdx/posts'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}
