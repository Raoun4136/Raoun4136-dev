import { NextSeo } from 'next-seo';
import Container from '../components/Container';
import metadata from '../data/metadata';
import { Dev } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

const DevLayout = ({ post }: { post: Dev }) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <Container>
      <>
        <NextSeo
          title={`${post.title}`}
          description={post.description}
          canonical={`${metadata.meta.url}/dev/${post.slug}`}
          openGraph={{
            type: 'article',
            url: `${metadata.meta.url}/dev/${post.slug}`,
            article: {
              publishedTime: new Date(post.date).toISOString(),
            },
          }}
        />
        <MDXComponent />
      </>
    </Container>
  );
};

export default DevLayout;
