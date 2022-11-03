import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  backdrop-filter: blur(7px); 
  background-color: var(--header-bg);
  z-index: 100;

  
}
`;

export const InnerHeader = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

svg {
  color: var(--text-base);
  display: block;
  width: 60px; 
  height: 60px ;
  path {
    fill: var(--text - base - 70);
    transition: all 0.2s ease;
}
&:hover {
  svg path {
    fill: var(--text-base);
  }
}
`