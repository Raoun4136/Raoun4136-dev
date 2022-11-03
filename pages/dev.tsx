import { NextSeo } from 'next-seo';
import { MDXProvider } from '@mdx-js/react';
import metadata from '../data/metadata';
import Post from "../posts/dev/woowacourse/woowa-free-1.mdx"


export default function Dev() {
  return (
    <>
      <NextSeo
        title='우테코'
        description='우아한 테크코스'
        canonical={`${metadata.meta.url}/dev/woowacourse`}
        openGraph={{ url: `${metadata.meta.url}/woowacourse` }}
      />
      <MDXProvider>
        <Post />
      </MDXProvider>
    </>
  );
}
