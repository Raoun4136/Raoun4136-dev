import { Daily, Dev } from 'contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import {
  PostCard,
  PostTitle,
  PostDesc,
  PostsContainer,
  PostImage,
  PostType,
} from './PostList.style';

const PostList = ({ posts }: { posts: Daily[] | Dev[] }) => {
  return (
    <PostsContainer>
      {posts.map((post, idx) => (
        <Link key={idx} href={`../${post._raw.flattenedPath}`}>
          <PostCard>
            <PostImage>
              <Image
                src={`/posts/${post._raw.flattenedPath}/thumbnail.jpg`}
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              ></Image>
            </PostImage>
            <PostType>{post.type}</PostType>
            <PostTitle>{post.title}</PostTitle>
            <PostDesc>{post.description}</PostDesc>
          </PostCard>
        </Link>
      ))}
    </PostsContainer>
  );
};

export default PostList;
