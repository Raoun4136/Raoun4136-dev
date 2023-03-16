import styled from '@emotion/styled';

export const NavContainer = styled.div`
  width: 100%;

  ul {
    justify-content: flex-end;
    display: flex;
    gap: 2rem;
    opacity: 1;
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
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
`;
