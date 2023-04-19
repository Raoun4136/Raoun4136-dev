import styled from '@emotion/styled';

export const ErrorSection = styled.section`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    padding: 2rem 0;
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 7rem;
  font-weight: 900;

  @media screen and (max-width: 350px) {
    font-size: 5rem;
    font-weight: 800;
  }
`;

export const HomeButton = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-base-90);
  :hover {
    cursor: pointer;
    color: var(--accent);
  }
`;
