import { NextSeo } from 'next-seo';
import metadata from '../data/metadata';
import { allDailies, Daily } from 'contentlayer/generated';
import Container from 'components/Container';
import RecentPosts from './../components/RecentPosts';

export default function DailyPage({ posts }: { posts: Daily[] }): JSX.Element {
  return (
    <>
      <NextSeo
        title="Daily"
        description="일상이야기"
        canonical={`${metadata.meta.url}/daily`}
        openGraph={{ url: `${metadata.meta.url}/daily` }}
      />
      <Container>
        <RecentPosts posts={posts} />
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = allDailies.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      posts,
    },
  };
};
