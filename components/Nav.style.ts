import styled from '@emotion/styled';

export const NavContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 3rem;
  opacity: 0.8;
  font-weight: 600;

  a {
    &:hover {
      opacity: 1;
      text-decoration: underline;
      color: #2f78bc;
      transition: 0.3s;
    }
  }
  .active {
    opacity: 1;
    color: var(--accent);
    font-weight: 800;
  }
`;
