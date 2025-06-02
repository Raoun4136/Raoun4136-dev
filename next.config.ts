import { mdxOptions } from '@/components/lib/mdx';
import createMDX, { NextMDXOptions } from '@next/mdx';
import { NextConfig } from 'next';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import rehypeToc from 'rehype-toc';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // options: mdxOptions as NextMDXOptions['options'],
  options: {
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
      // [
      //   rehypePrettyCode,
      //   {
      //     theme: {
      //       dark: 'github-dark',
      //       light: 'github-light',
      //     },
      //     keepBackground: false,
      //   },
      // ],
    ],
  },
});

export default withMDX(nextConfig);
