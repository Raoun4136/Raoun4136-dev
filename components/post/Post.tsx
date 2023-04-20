import { DocumentTypes } from 'contentlayer/generated';
import convertDateUs from 'lib/convertDateUs';
import Image from 'next/image';
import Link from 'next/link';
import {
  PostCard,
  PostTitle,
  PostDesc,
  PostType,
  PostDate,
  PostInfo,
  PostImg,
  PostData,
  PostTitleSection,
} from './Post.style';

const Post = ({ post }: { post: DocumentTypes }) => {
  return (
    <Link href={`../${post._raw.flattenedPath}`}>
      <PostCard>
        <PostImg>
          <Image
            src={`/posts/${post._raw.flattenedPath}.jpg`}
            layout="fill"
            className="autoImage"
          ></Image>
        </PostImg>
        <PostInfo>
          <PostTitleSection>
            <PostTitle>{post.title}</PostTitle>
            <PostDesc>{post.description}</PostDesc>
          </PostTitleSection>

          <PostData>
            <PostDate>{convertDateUs(post.date)}</PostDate>
            <PostType>{post.type}</PostType>
          </PostData>
        </PostInfo>
      </PostCard>
    </Link>
  );
};

export default Post;
