import {
  PostHeaderTitle,
  PostNav,
  PostLink,
  PostHeaderContainer,
} from './PostHeader.style';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostHeader = () => {
  const router = useRouter();
  return (
    <PostHeaderContainer>
      <PostHeaderTitle>Posts</PostHeaderTitle>
      <PostNav>
        <PostLink>
          <Link href="/posts/all">
            <a
              className={
                router.asPath.includes('posts/all') || router.asPath == '/posts'
                  ? 'active'
                  : 'nonActive'
              }
            >
              All
            </a>
          </Link>
        </PostLink>
        <PostLink>
          <Link href="/posts/dev">
            <a
              className={
                router.asPath.includes('/dev') ? 'active' : 'nonActive'
              }
            >
              Dev
            </a>
          </Link>
        </PostLink>
        <PostLink>
          <Link href="/posts/daily">
            <a
              className={
                router.asPath.includes('/daily') ? 'active' : 'nonActive'
              }
            >
              Daily
            </a>
          </Link>
        </PostLink>
      </PostNav>
    </PostHeaderContainer>
  );
};
export default PostHeader;
