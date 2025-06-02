import { Metadata } from 'next';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import MDX from './_page.mdx';
import '@/styles/mdx.css';
import { TocHighlighter } from '@/components/toc-highlighter';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: '소개',
  description: '반갑습니다, 박성오 · Raoun 입니다',
  alternates: {
    canonical: RouterPath.ABOUT,
  },
  openGraph: {
    ...CommonMetaData.openGraph,
    url: RouterPath.ABOUT,
  },
};

export default function About() {
  return (
    <article>
      <section className="mdx">
        <MDX />
        <TocHighlighter />
      </section>
    </article>
  );
}
