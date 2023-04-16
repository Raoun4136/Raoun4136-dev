import { NextSeo } from 'next-seo';
import metadata from '../data/metadata';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Dev } from 'contentlayer/generated';
import { Container, MDXDev } from 'components';

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
        <MDXDev
          title={post.title}
          date={post.date}
          path={`${metadata.meta.url}/blog/${post.slug}`}
          tags={post.tags}
        >
          <MDXComponent />
        </MDXDev>
      </>
    </Container>
  );
};

export default DevLayout;
