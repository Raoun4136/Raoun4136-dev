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
  font-size: var(--logo-font-size);
  font-weight: var(--text-font-weight);

  @media screen and (max-width: 600px) {
    font-size: var(--logo-font-size);
    font-weight: var(--text-font-weight);
  }
`;

export const AboutHeaderTitle = styled.div`
  font-size: var(--header-font-size);
  font-weight: var(--header-font-weight);

  span {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    font-size: var(--logo-font-size);
    font-weight: var(--mobile-logo-font-weight);
  }
`;
