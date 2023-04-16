import styled from '@emotion/styled';

export const IntroSection = styled.section`
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 0;
  width: 100%;
  align-items: flex-start;
  @media screen and (max-width: 600px) {
    padding: 2rem 0;
  } ;
`;

export const IntroTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const IntroDetail = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-base-90);
  margin-top: 0.5rem;
`;

export const IntroButton = styled.button`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-base-70);
  border: none;
  padding: 0;
  background: none;
  text-decoration: underline;
  margin-top: 1.5rem;

  &:hover {
    color: var(--accent);
    cursor: pointer;
  }
`;
