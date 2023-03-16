import { DocumentTypes } from 'contentlayer/generated';
import { PostsContainer } from './PostList.style';
import { Post } from 'components';

const PostList = ({ posts }: { posts: DocumentTypes[] }) => {
  return (
    <PostsContainer>
      {posts.map((post, idx) => (
        <Post post={post} key={idx} />
      ))}
    </PostsContainer>
  );
};

export default PostList;
