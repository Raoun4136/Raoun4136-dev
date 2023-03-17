import styled from '@emotion/styled';

export const IntroContainer = styled.div`
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  width: 100%;

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  } ;
`;

export const IntroInnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const IntroTitle = styled.h1`
  font-size: var(--intro-font-size);
  font-weight: var(--intro-font-weight);
  margin-top: 1rem;
`;

export const IntroDetail = styled.h2`
  font-size: var(--text-font-size);
  font-weight: var(--text-font-weight);
  color: var(--text-base-90);
  margin-top: 0.5rem;
`;

export const IntroButton = styled.button`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
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
