import { DocumentTypes } from 'contentlayer/generated';
import Link from 'next/link';
import {
  RecentContainer,
  RecentInnerContainer,
  RecentTitle,
  RecentPost,
  RecentMore,
  RecentHeader,
} from './RecentPosts.style';
import Post from 'components/post/Post';

const RecentPosts = ({ posts }: { posts: DocumentTypes[] }) => {
  return (
    <RecentContainer>
      <RecentInnerContainer>
        <RecentHeader>
          <RecentTitle>최근 포스트</RecentTitle>
          <RecentMore>
            <Link href="/posts">더보기</Link>
          </RecentMore>
        </RecentHeader>
        <RecentPost>
          {posts.map((post, idx) => (
            <Post key={idx} post={post} />
          ))}
        </RecentPost>
      </RecentInnerContainer>
    </RecentContainer>
  );
};

export default RecentPosts;
