import { NextSeo } from 'next-seo';
import metadata from 'data/metadata';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Daily } from 'contentlayer/generated';
import { Container, MDXDaily, MDXComment } from 'components';

const DailyLayout = ({ post }: { post: Daily }) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <Container>
      <>
        <NextSeo
          title={`${post.title}`}
          description={post.description}
          canonical={`${metadata.meta.url}/daily/${post.slug}`}
          openGraph={{
            type: 'article',
            url: `${metadata.meta.url}/daily/${post.slug}`,
            article: {
              publishedTime: new Date(post.date).toISOString(),
            },
          }}
        />
        <MDXDaily
          key={post.title}
          title={post.title}
          date={post.date}
          path={`${metadata.meta.url}/daily/${post.slug}`}
          tags={post.tags}
        >
          <MDXComponent />
        </MDXDaily>
        <MDXComment />
      </>
    </Container>
  );
};

export default DailyLayout;
