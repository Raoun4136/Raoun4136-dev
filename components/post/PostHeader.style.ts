import styled from '@emotion/styled';

export const PostHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0 1rem 0;
  .active {
    color: var(--accent);
    font-weight: 800;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  }
`;

export const PostHeaderTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;

  span {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const PostNav = styled.div`
  padding: 2rem 0 2rem 0;
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 600px) {
    padding: 1rem 0 1rem 0;
  }
`;

export const PostLink = styled.div`
  display: inline-block;
  color: var(--text-base-70);
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
