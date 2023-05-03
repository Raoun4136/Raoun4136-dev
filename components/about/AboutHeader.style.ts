import styled from '@emotion/styled';

export const AboutHeaderSection = styled.section`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    padding: 2rem 0;
  }
`;

export const AboutHeaderWelcome = styled.div`
  font-size: 1.4rem;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

export const AboutHeaderTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 800;

  span {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;
