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
  transition: 0.2s;

  .open {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
  }
`;

export const InnerHeader = styled.div``;

export const HeaderLogo = styled.h1`
  font-weight: 800;
  font-size: 1.4rem;
  white-space: nowrap;
  :hover {
    cursor: pointer;
    color: var(--accent);
    transition: 0.2s;
    span {
      color: var(--text-base);
    }
  }
  span {
    color: var(--accent);
  }
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const MobileHeader = styled.div`
  display: none;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;

  @media screen and (max-width: 600px) {
    display: flex;
  }
  .open {
    display: none;
  }
`;
export const DesktopHeader = styled.div`
  max-width: 768px;
  display: flex;
  flex-direction: row;
  height: 2rem;
  margin: 0 auto;
  align-items: center;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
