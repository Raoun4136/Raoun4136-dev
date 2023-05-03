import { Container, PostList, PostHeader } from 'components';
import { allDocuments } from 'contentlayer/generated';
import { InferGetStaticPropsType, GetStaticProps } from 'next';

const PostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <PostHeader />
      <PostList posts={posts.slice(0, 1)}></PostList>
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
  paths.push({ params: { slug: ['all'] } }); //all object
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let posts;
  if (params?.slug == 'all' || !params?.slug) {
    posts = allDocuments.sort(
      (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
    );
  } else {
    posts = allDocuments
      .filter(
        (post: { type: string }) =>
          post.type.toLocaleLowerCase() == params?.slug
      )
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  }

  return { props: { posts } };
};

export default PostsPage;
