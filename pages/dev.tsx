import Container from 'components/Container';
import { NextSeo } from 'next-seo';
import metadata from '../data/metadata';
import { allDevs, Dev } from 'contentlayer/generated';
import RecentPosts from './../components/RecentPosts';

export default function DevPage({ posts }: { posts: Dev[] }): JSX.Element {
  return (
    <>
      <NextSeo
        title="Dev"
        description="프로그래밍"
        canonical={`${metadata.meta.url}/dev`}
        openGraph={{ url: `${metadata.meta.url}/dev` }}
      />
      <Container>
        <RecentPosts posts={posts} />
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = allDevs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      posts,
    },
  };
};
