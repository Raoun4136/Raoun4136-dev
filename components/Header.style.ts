import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  display: block;
  position: sticky;
  padding: 1rem 1.5rem;
  top: 0;
  width: 100%;
  backdrop-filter: blur(7px);
  z-index: 100;
  background-color: var(--header-bg);
`;

export const InnerHeader = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  height: 3rem;
  margin: 0 auto;
  align-items: center;
`;

export const HeaderLogo = styled.h1`
  font-weight: 800;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
    color: #2f78bc;
    transition: 0.3s;
  }
  &:action {
  }
`;
