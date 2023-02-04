import styled from '@emotion/styled';

export const RecentContainer = styled.div`
  width: 100%;
  padding: 3rem 1.5rem;
  overflow: hidden;
`;
export const RecentInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;
export const RecentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RecentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const RecentMore = styled.span`
  opacity: 0.6;
  &:hover {
    opacity: 1;
    color: var(--accent);
  }
`;

export const RecentPost = styled.div`
  display: flex;
  gap: 1rem;
`;
