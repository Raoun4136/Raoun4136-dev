import { allDocuments, DocumentTypes } from 'contentlayer/generated';
import RecentPosts from 'components/home/RecentPosts';
import Intro from 'components/home/Intro';
import Projects from 'components/home/Projects';
import HomeContainer from './../components/home/HomeContainer';

export default function Home({
  documents,
}: {
  documents: DocumentTypes[];
}): JSX.Element {
  return (
    <HomeContainer>
      <Intro />
      <RecentPosts posts={documents} />
    </HomeContainer>
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
