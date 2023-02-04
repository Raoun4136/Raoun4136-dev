import styled from '@emotion/styled';

export const NavContainer = styled.div`
  width: 100%;

  ul {
    justify-content: flex-end;
    display: flex;
    gap: 3rem;
    opacity: 1;
    font-size: 1.2rem;
    font-weight: 600;
  }
  li {
    &:hover {
      opacity: 1;
      text-decoration: underline;
      transition: 0.3s;
    }
  }
  .active {
    opacity: 1;
    color: var(--accent);
  }
`;
