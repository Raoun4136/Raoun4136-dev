import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  backdrop-filter: blur(7px);
  background-color: var(--header-bg);
  z-index: 100;
`;

export const InnerHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  align-items: center;
`;
export const InnerTheme = styled.div`
  margin-left: 2rem;
  img {
    color: var(--text-base);
    display: block;
    &:hover {
      cursor: pointer;
    }
`;

export const HeaderLogo = styled.h1`
  font-weight: 800;
  &:hover {
    cursor: pointer;
    color: #2f78bc;
    transition: 0.3s;
  }
  &:action {
  }
`;
