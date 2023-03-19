import { DocumentTypes } from 'contentlayer/generated';
import Link from 'next/link';
import {
  RecentSection,
  RecentInnerContainer,
  RecentTitle,
  RecentMore,
  RecentHeader,
} from './RecentPosts.style';
import { PostList } from 'components';
import { useEffect, useState } from 'react';

const RecentPosts = ({ posts }: { posts: DocumentTypes[] }) => {
  // hydration failed
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
    console.log(posts);
  }, []);

  return (
    mounted && (
      <RecentSection>
        <RecentInnerContainer>
          <RecentHeader>
            <RecentTitle>최근 포스트</RecentTitle>
            <RecentMore>
              <Link href="/posts">더보기</Link>
            </RecentMore>
          </RecentHeader>
          <PostList posts={posts} />
        </RecentInnerContainer>
      </RecentSection>
    )
  );
};

export default RecentPosts;
