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
      <article className="mb-16 mt-8 w-full max-w-2xl text-left">
        <section className="mb-12 opacity-90">
          <h1 className="text-md font-medium">{props.frontMatter.title}</h1>
          <h2 className="text-sm font-extralight">{props.frontMatter.description}</h2>
          <span className="text-xs font-extralight">{format(props.frontMatter.date, 'yyyy-MM-dd')}</span>
        </section>
        <section className="mdx">
          <MDXRemote source={props.content} options={options as any} />
          <GiscusComment />
        </section>
      </article>
    </>
  );
}

export async function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    title: `${blog.frontMatter.title}`,
    description: blog.frontMatter.description + blog.content,
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
