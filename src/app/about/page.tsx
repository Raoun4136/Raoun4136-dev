import { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import '@/styles/mdx.css';
import { TocHighlighter } from '@/components/toc-highlighter';
import { MdxEntranceMotion } from '@/components/mdx-entrance-motion';
import { mdxOptions } from '@/components/lib/mdx';

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

export default async function About() {
  const aboutSource = await readFile(join(process.cwd(), 'src/app/about/_page.mdx'), 'utf8');

  return (
    <article>
      <section className="mb-12 opacity-90">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h1 className="text-md font-semibold">About</h1>
            <h2 className="text-sm font-light opacity-70">{metadata.description}</h2>
          </div>
        </div>
      </section>
      <section className="mdx" data-motion-state="pending">
        {await MDXRemote({ source: aboutSource, options: mdxOptions })}
        <MdxEntranceMotion />
        <TocHighlighter />
      </section>
    </article>
  );
}
