import styled from '@emotion/styled';

export const NavContainer = styled.div`
  width: 100%;

  ul {
    justify-content: flex-end;
    display: flex;
    gap: 2rem;
    opacity: 1;
    font-size: 1rem;
    font-weight: 500;
  }
  li {
    &:hover {
      opacity: 1;
      color: var(--accent);
      transition: 0.3s;
    }
  }
  .active {
    opacity: 1;
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    ul {
      flex-direction: column;
      margin-left: 0.5rem;
    }
  }
`;
