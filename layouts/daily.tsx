import { NextSeo } from 'next-seo';
import Container from '../components/Container';
import metadata from '../data/metadata';
import { Daily } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import MDXdaily from './../components/daily/MDXdaily';

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
        <MDXdaily>
          <MDXComponent />
        </MDXdaily>
      </>
    </Container>
  );
};

export default DailyLayout;
