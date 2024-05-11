import { Container, PostList, PostHeader } from 'components';
import { allDocuments } from 'contentlayer/generated';
import metadata from 'data/metadata';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

const PostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Posts"
        description="포스트"
        canonical={`${metadata.meta.url}/posts`}
        openGraph={{ url: `${metadata.meta.url}/posts` }}
      />
      <Container>
        <PostHeader />
        <PostList posts={posts}></PostList>
      </Container>
    </>
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
