import Container from '../components/Container';
import { allDevs, Dev, allDailies, Daily } from 'contentlayer/generated';
import RecentPosts from '../components/RecentPosts';
import Profile from 'components/Profile';

export default function Home({
  dailies,
  devs,
}: {
  dailies: Daily[];
  devs: Dev[];
}): JSX.Element {
  return (
    <Container>
      <Profile />
      <RecentPosts posts={dailies} />
      <RecentPosts posts={devs} />
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
  return {
    props: {
      devs,
      dailies,
    },
  };
};
