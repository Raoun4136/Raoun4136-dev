import { allDevs } from 'contentlayer/generated';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { DevLayout } from 'layouts';

//TODO: devPage가 아닌 posts로 옮길것
const DevPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DevLayout post={post} />;
};

export const getStaticPaths = async () => {
  const paths = allDevs.map((post: { pathSegments: any }) => ({
    params: { slug: post.pathSegments.map((el: any) => el.toString()) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = allDevs.find(
    (post: { pathSegments: any }) =>
      post.pathSegments?.map((el: any) => el.toString()).join('/') ==
      params?.slug.join('/')
  );
  return { props: { post } };
};

export default DevPage;
