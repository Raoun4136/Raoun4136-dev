import styled from '@emotion/styled';

export const IntroContainer = styled.div`
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--accent);
  height: calc(400px);
  padding: 0 1.5rem;
  width: 100%;
  overflow: hidden;
`;

export const IntroInnerContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const IntroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 1000;
  margin-top: 1rem;
`;

export const IntroDetail = styled.h2`
  font-weight: 500;
  font-size: 1.7rem;
  margin-top: 1rem;
`;

export const IntroButton = styled.button`
  width: max-content;
  border: none;
  font-size: 1.2rem;
  opacity: 0.6;
  padding: 0.4rem 0.1rem;
  background: 0;
  text-decoration: underline;

  &:hover {
    opacity: 1;
  }
`;
export const IntroAbout = styled.link``;
