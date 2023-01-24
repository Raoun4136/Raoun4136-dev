import styled from '@emotion/styled';

export const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 3rem;

  a {
    &:hover {
      text-decoration: underline;
      color: #2f78bc;
      transition: 0.3s;
    }
  }
`;
