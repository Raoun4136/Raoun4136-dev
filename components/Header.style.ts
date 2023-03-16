import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  display: block;
  position: sticky;
  padding: 1rem 1.5rem;
  top: 0;
  width: 100%;
  backdrop-filter: blur(7px);
  z-index: 1000;
  background-color: var(--header-bg);
`;

export const InnerHeader = styled.div`
  max-width: 768px;
  display: flex;
  flex-direction: row;
  height: 2rem;
  margin: 0 auto;
  align-items: center;
`;

export const HeaderLogo = styled.h1`
  font-weight: var(--logo-font-weight);
  font-size: var(--logo-font-size);
  &:hover {
    cursor: pointer;
    color: var(--accent);
    transition: 0.3s;
  }
`;
