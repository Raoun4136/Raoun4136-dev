import '@/styles/mdx.css';

import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { format } from 'date-fns';
import GiscusComment from '@/components/giscus-comment';
import { TocHighlighter } from '@/components/toc-highlighter';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import Link from 'next/link';

import { notFound } from 'next/navigation';
import { ResolvingMetadata } from 'next';
import { mdxOptions } from '@/components/lib/mdx';
import ImageZoomer from '@/components/ImageZoomer';
import { MdxEntranceMotion } from '@/components/mdx-entrance-motion';
import JsonLd from '@/components/json-ld';
import { CommonMetaData } from '@/components/lib/constant';
import { getPostBySlug, getPostEntries } from '@/db/queries/contents';
import ContentViewTracker from '@/components/content-view-tracker';
import { StudioEditContentButton } from '@/components/studio/studio-entry-actions';
import { isVercelProduction } from '@/lib/runtime-env';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PostPageProps, parent: ResolvingMetadata) {
  const params = await props.params;
  const parentData = await parent;

  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    ...parentData.openGraph,
    title: post.meta.title,
    description: (post.meta.description ?? '') + (post.content?.slice(0, 100) ?? '') + '...',
    alternates: {
      canonical: `/posts/${params.slug}`,
    },
    openGraph: {
      ...parentData.openGraph,
      url: `/posts/${params.slug}`,
    },
  };
}

export default async function Post(props: PostPageProps) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  const posts = await getPostEntries();

  if (!post) notFound();

  const currentIndex = posts.findIndex((entry) => entry.slug === params.slug);

  if (currentIndex === -1) notFound();

  const previousPost = posts[currentIndex + 1];
  const nextPost = posts[currentIndex - 1];
  const siteUrl = CommonMetaData.metadataBase.toString().replace(/\/$/, '');
  const pageUrl = new URL(`/posts/${params.slug}`, CommonMetaData.metadataBase).toString();
  const publishedAt = new Date(post.meta.date).toISOString();
  const postMetaLine = [
    format(post.meta.date, 'yyyy-MM-dd'),
    post.meta.readTimeMin ? `${post.meta.readTimeMin}분` : null,
    `조회 ${post.meta.viewCount ?? 0}`,
  ]
    .filter(Boolean)
    .join(' · ');
  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: post.meta.title,
    description: post.meta.description ?? '',
    datePublished: publishedAt,
    dateModified: new Date(post.meta.update ?? post.meta.date).toISOString(),
    inLanguage: 'ko-KR',
    articleSection: 'Posts',
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: '박성오',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Raoun.me',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/og-image.png`,
      },
    },
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    url: pageUrl,
  };

  return (
    <>
      <JsonLd id={`post-jsonld-${params.slug}`} data={postJsonLd} />
      <article>
        <section className="mb-12 opacity-90">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-md font-semibold">{post.meta.title}</h1>
              <h2 className="text-sm font-light opacity-70">{post.meta.description}</h2>
              <span className="text-xs font-light opacity-70">{postMetaLine}</span>
            </div>
            <StudioEditContentButton contentId={post.id} />
          </div>
          {post.meta.outlink && (
            <Link href={post.meta.outlink} target="_blank" rel="noopener noreferrer">
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
        <section className="mdx" data-motion-state="pending">
          {await MDXRemote({ source: post.content, options: mdxOptions })}
          <nav className="mt-12 grid grid-cols-2 gap-3 border-t pt-6">
            {previousPost ? (
              <Link
                href={`/posts/${previousPost.slug}`}
                className="group flex min-h-24 flex-col justify-between rounded-lg border border-border/70 px-4 py-3 transition-colors hover:bg-secondary/50"
              >
                <span className="text-xs opacity-70">이전 글</span>
                <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:underline">{previousPost.meta.title}</p>
              </Link>
            ) : (
              <div
                aria-hidden
                className="min-h-24 rounded-lg border border-border/40 bg-secondary/10 opacity-50"
              />
            )}
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group flex min-h-24 flex-col justify-between rounded-lg border border-border/70 px-4 py-3 text-right transition-colors hover:bg-secondary/50"
              >
                <span className="text-xs opacity-70">다음 글</span>
                <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:underline">{nextPost.meta.title}</p>
              </Link>
            ) : (
              <div
                aria-hidden
                className="min-h-24 rounded-lg border border-border/40 bg-secondary/10 opacity-50"
              />
            )}
          </nav>
          <MdxEntranceMotion />
          <ImageZoomer />
          <GiscusComment />
          <TocHighlighter />
          <ContentViewTracker type="post" slug={params.slug} enabled={isVercelProduction} />
        </section>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPostEntries();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
