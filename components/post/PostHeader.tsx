import {
  PostHeaderTitle,
  PostNav,
  PostLink,
  PostHeaderSection,
} from './PostHeader.style';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostHeader = () => {
  const router = useRouter();
  return (
    <PostHeaderSection>
      <PostHeaderTitle>My Posts</PostHeaderTitle>
      <PostNav>
        <PostLink>
          <Link href="/posts/all">
            <a
              className={
                router.asPath.includes('/all') ? 'active' : 'nonActive'
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
    </PostHeaderSection>
  );
};
export default PostHeader;
