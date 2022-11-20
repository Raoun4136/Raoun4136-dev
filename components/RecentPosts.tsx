import { Daily, Dev } from 'contentlayer/generated';
import Link from 'next/link';
import {
  RecentCard,
  RecentTitle,
  RecentDesc,
  RecentDate,
  RecentInfo,
} from './RecentPosts.style';

const RecentPosts = ({ posts }: { posts: Daily[] | Dev[] }) => {
  return (
    <>
      {posts && posts[0].type == 'Daily' ? (
        <>
          <RecentInfo>최신 일기</RecentInfo>
          {posts.map((post, idx) => (
            <>
              <Link key={idx} href={`${post._raw.flattenedPath}`}>
                <RecentCard>
                  <RecentTitle>{post.title}</RecentTitle>
                  <RecentDesc>{post.description}</RecentDesc>
                  <RecentDate>{post.date}</RecentDate>
                </RecentCard>
              </Link>
            </>
          ))}
        </>
      ) : (
        <>
          <RecentInfo>최신 포스트</RecentInfo>
          {posts.map((post, idx) => (
            <>
              <Link key={idx} href={`/dev/${post.slug}`}>
                <RecentCard>
                  <RecentTitle>{post.title}</RecentTitle>
                  <RecentDesc>{post.description}</RecentDesc>
                  <RecentDate>{post.date}</RecentDate>
                </RecentCard>
              </Link>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default RecentPosts;
