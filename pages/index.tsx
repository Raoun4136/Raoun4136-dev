import Container from '../components/Container';
import {
  allDevs,
  Dev,
  allDailies,
  Daily,
  allDocuments,
  DocumentTypes,
} from 'contentlayer/generated';
import RecentPosts from '../components/RecentPosts';
import Profile from 'components/Profile';

export default function Home({
  dailies,
  devs,
  documents,
}: {
  dailies: Daily[];
  devs: Dev[];
  documents: DocumentTypes[];
}): JSX.Element {
  return (
    <Container>
      {documents.map((el) => (
        <div>{el.title}</div>
      ))}
    </Container>
  );
}
export const getStaticProps = async () => {
  const devs = allDevs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const dailies = allDailies.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const documents = allDocuments.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      devs,
      dailies,
      documents,
    },
  };
};
