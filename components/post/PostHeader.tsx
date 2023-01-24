import {
  PostHeaderTitle,
  PostNav,
  PostLink,
  PostHeaderContainer,
} from './PostHeader.style';

const PostHeader = () => {
  return (
    <PostHeaderContainer>
      <PostHeaderTitle>POSTS</PostHeaderTitle>
      <PostNav>
        <PostLink href="/posts/all">ALL</PostLink>
        <PostLink href="/posts/dev">DEV</PostLink>
        <PostLink href="/posts/daily">DAILY</PostLink>
      </PostNav>
    </PostHeaderContainer>
  );
};
export default PostHeader;
