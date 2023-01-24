import styled from '@emotion/styled';

export const PostHeaderTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
`;
export const PostNav = styled.div`
  margin-top: 75px;
`;

export const PostLink = styled.a`
  margin-right: 70px;
  opacity: 0.6;
  color: var(--text-base);
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export const PostHeaderContainer = styled.div`
  margin: 60px 0 40px 0;
`;
