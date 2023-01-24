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
      <PostHeaderTitle>POSTS</PostHeaderTitle>
      <PostNav>
        <PostLink>
          <Link href="/posts/all">
            <a
              className={
                router.asPath.includes('posts/all') ? 'active' : 'nonActive'
              }
            >
              ALL
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
              DEV
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
              DAILY
            </a>
          </Link>
        </PostLink>
      </PostNav>
    </PostHeaderContainer>
  );
};
export default PostHeader;
