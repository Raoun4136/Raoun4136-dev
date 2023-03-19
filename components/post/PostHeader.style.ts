import styled from '@emotion/styled';

export const PostHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  .active {
    color: var(--accent);
    font-weight: var(--logo-font-weight);
  }

  @media screen and (max-width: 600px) {
    padding: 2rem 0;
  }
`;

export const PostHeaderTitle = styled.div`
  font-size: var(--header-font-size);
  font-weight: var(--header-font-weight);

  span {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    font-size: var(--logo-font-size);
    font-weight: var(--mobile-logo-font-weight);
  }
`;

export const PostNav = styled.div`
  padding: 3rem 0 2rem 0;
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 600px) {
    padding: 2rem 0 1rem 0;
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
