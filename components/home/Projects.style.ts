import styled from '@emotion/styled';

export const ProjectsSection = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  justify-content: center;

  > h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

export const ProjectInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media screen and (max-width: 600px) {
  }
`;

export const ProjectSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;

  a {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--text-base-70);
    text-decoration: underline;
  }
  a:hover {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    gap: 0.8rem;
  }
`;

export const ProjectInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
`;

export const ProjectTitle = styled.h2`
  font-weight: 600;
`;

export const ProjectDesc = styled.h3`
  width: 100%;
  color: var(--text-base-70);
`;

export const ProjectDate = styled.h3`
  width: 15rem;
  flex-shrink: 0;
  color: var(--text-base-70);
`;

export const ProjectImg = styled.div`
  img {
    border-radius: 0.5rem;
  }
`;
