import { allDailies } from 'contentlayer/generated';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import DailyLayout from 'layouts/daily';

const DailyPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DailyLayout post={post} />;
};

export const getStaticPaths = async () => {
  const paths = allDailies.map((post: { slug: unknown }) => ({
    params: { slug: [post.slug] },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allDailies.find(
    (post: { slug: string | string[] | undefined }) => post.slug == params?.slug
  );
  return { props: { post } };
};

export default DailyPage;
