import styled from '@emotion/styled';

export const ParentContainer = styled.div``;

export const Main = styled.main`
  padding: 1rem 1.5rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  min-height: calc(100vh - 4rem - 7rem);

  .contents {
    display: block;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  }

  @media screen and (max-width: 480px) {
    min-height: calc(100vh - 4rem - 5rem);
  }
`;

export const InnerContainer = styled.div`
  height: auto;
`;
