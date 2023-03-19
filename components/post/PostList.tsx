import { DocumentTypes } from 'contentlayer/generated';
import { PostsSection } from './PostList.style';
import { Post } from 'components';

const PostList = ({ posts }: { posts: DocumentTypes[] }) => {
  return (
    <PostsSection>
      {posts.map((post, idx) => (
        <Post post={post} key={idx} />
      ))}
    </PostsSection>
  );
};

export default PostList;
