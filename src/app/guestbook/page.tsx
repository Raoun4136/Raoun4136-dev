import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import { Metadata } from 'next';
import '@/styles/mdx.css';
import MDX from './_page.mdx';
import GiscusComment from '@/components/giscus-comment';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: '방명록',
  description: '자유롭게 남겨주세요 :)',
  alternates: {
    canonical: RouterPath.GUESTBOOK,
  },
  openGraph: {
    ...CommonMetaData.openGraph,
    url: RouterPath.GUESTBOOK,
  },
};

export default function Guestbook() {
  return (
    <article>
      <section className="mdx">
        <MDX />
        <GiscusComment />
      </section>
    </article>
  );
}
