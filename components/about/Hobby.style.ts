import styled from '@emotion/styled';

export const HobbySection = styled.section`
  margin-top: 32px;
`;

export const HobbyHeader = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 4px;
`;

export const HobbyItemWrapper = styled.div``;

export const HobbyLink = styled.a`
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: underline;
  cursor: pointer;

  transition: color 0.2s;

  &:hover {
    color: var(--accent);
  }
`;

export const HobbyDesc = styled.p`
  font-size: 1rem;
  font-weight: 300;
  margin-left: 16px;
  margin-top: 4px;
`;
