import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import './mdx.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { format } from 'date-fns';

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
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrettyCode],
    },
  };

  return (
    <article className="mb-16 mt-8 w-full max-w-2xl text-left">
      <section className="mb-12">
        <h1 className="mb-3 text-xl font-semibold">{props.frontMatter.title}</h1>
        <h2 className="text-base font-medium">{props.frontMatter.description}</h2>
        <span className="text-sm font-light">{format(props.frontMatter.date, 'yyyy-MM-dd')}</span>
      </section>
      <section className="mdx">
        <MDXRemote source={props.content} options={options} />
      </section>
    </article>
  );
}

export async function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    title: `${blog.frontMatter.title}`,
    description: blog.frontMatter.description,
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
