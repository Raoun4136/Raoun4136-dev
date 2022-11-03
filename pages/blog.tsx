import { NextSeo } from 'next-seo';
import { MDXProvider } from '@mdx-js/react';
import metadata from '../data/metadata';
import Post from '../posts/blog/test.mdx';

export default function Blog() {
  return (
    <>
      <NextSeo
        title="Blog"
        description="블로그 설명"
        canonical={`${metadata.meta.url}/blog`}
        openGraph={{ url: `${metadata.meta.url}/blog` }}
      />
      <MDXProvider>
        <Post />
      </MDXProvider>
    </>
  );
}
