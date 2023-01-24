import Container from 'components/Container';
import PostList from 'components/post/PostList';
import PostHeader from 'components/post/PostHeader';
import { allDocuments } from 'contentlayer/generated';
import { InferGetStaticPropsType, GetStaticProps } from 'next';

//TODO: slug말고 query로 받아서 필터링하기
const PostPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <PostHeader></PostHeader>
      <PostList posts={posts}></PostList>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const typeArray = Array.from(
    new Set<string>(allDocuments.map((post) => post.type.toLocaleLowerCase()))
  );
  const paths = typeArray.map((type) => ({
    params: { slug: [type] },
  }));
  paths.push({ params: { slug: ['all'] } });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let posts;
  if (params?.slug == 'all') {
    posts = allDocuments;
  } else {
    posts = allDocuments.filter(
      (post: { type: string }) => post.type.toLocaleLowerCase() == params?.slug
    );
  }
  return { props: { posts } };
};

export default PostPage;
