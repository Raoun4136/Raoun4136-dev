import styled from '@emotion/styled';

export const PostHeaderTitle = styled.div`
  font-size: var(--logo-font-size);
  font-weight: var(--logo-font-weight);
`;
export const PostNav = styled.div`
  padding: 4rem 0;
`;

export const PostLink = styled.div`
  display: inline-block;
  margin-right: 3rem;
  color: var(--text-base-70);
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export const PostHeaderContainer = styled.div`
  margin: 20px 0 40px 0;
  .active {
    opacity: 1;
    color: var(--accent);
    font-weight: 800;
  }
`;
