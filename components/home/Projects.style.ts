import styled from '@emotion/styled';

export const ProjectsContainer = styled.div`
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  justify-content: center;

  > h2 {
    font-size: var(--intro-font-size);
    font-weight: var(--intro-font-weight);
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
    gap: 0.8rem;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.8rem;

  a {
    font-size: var(--link-font-size);
    font-weight: var(--link-font-weight);
    color: var(--text-base-90);
    text-decoration: underline;
  }
  a:hover {
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    gap: 0.4rem;
  }
`;

export const ProjectInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
`;

export const ProjectTitle = styled.h2``;

export const ProjectDesc = styled.h3`
  width: 100%;
  color: var(--text-base-90);
`;

export const ProjectDate = styled.h3`
  width: 15rem;
  flex-shrink: 0;
  color: var(--text-base-90);
`;
