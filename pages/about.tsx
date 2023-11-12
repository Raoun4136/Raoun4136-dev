import { NextSeo } from 'next-seo';
import metadata from 'data/metadata';
import { Container, AboutHeader, Profile } from 'components';
import Hobby from 'components/about/Hobby';

export default function DailyPage(): JSX.Element {
  return (
    <>
      <NextSeo
        title="About"
        description="이력서"
        canonical={`${metadata.meta.url}/about`}
        openGraph={{ url: `${metadata.meta.url}/about` }}
      />
      <Container>
        <AboutHeader />
        <Profile />
        <Hobby />
      </Container>
    </>
  );
}
