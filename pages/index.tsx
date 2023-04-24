import { allDocuments, DocumentTypes } from 'contentlayer/generated';
import { Intro, Projects, Container, RecentPosts } from 'components';

export default function Home({
  documents,
}: {
  documents: DocumentTypes[];
}): JSX.Element {
  return (
    <Container>
      <Intro />
      <Projects />
      <RecentPosts posts={documents.slice(0, 4)} />
    </Container>
  );
}
export const getStaticProps = async () => {
  const documents = allDocuments.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      documents,
    },
  };
};
