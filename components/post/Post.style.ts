import styled from '@emotion/styled';

export const PostCard = styled.div`
  height: 360px;
  flex-grow: 1;

  &:hover {
    cursor: pointer;
  }
  &:hover img {
    transition: 0.3s;
    transform: scale(1.1);
  }
  &:active {
  }
`;

export const PostType = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const PostImage = styled.div`
  position: relative;
  height: 210px;
  min-width: 376px;
`;

export const PostTitle = styled.div`
  margin-top: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const PostDesc = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  opacity: 0.8;
`;
