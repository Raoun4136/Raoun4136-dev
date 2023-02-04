import { DocumentTypes } from 'contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import {
  PostCard,
  PostTitle,
  PostDesc,
  PostImage,
  PostType,
} from './Post.style';

const Post = ({ post }: { post: DocumentTypes }) => {
  return (
    <Link href={`../${post._raw.flattenedPath}`}>
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
  );
};

export default Post;
