import { allDevs } from 'contentlayer/generated';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import DevLayout from './../../layouts/dev';

const DevPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DevLayout post={post} />;
};

export const getStaticPaths = async () => {
  const paths = allDevs.map((post: { slug: any }) => ({
    params: { slug: [post.slug] },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allDevs.find(
    (post: { slug: string | string[] | undefined }) => post.slug == params?.slug
  );
  return { props: { post } };
};

export default DevPage;
