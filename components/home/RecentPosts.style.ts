import styled from '@emotion/styled';

export const RecentSection = styled.section`
  padding: 4rem 0;
  gap: 2rem;
`;
export const RecentInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 768px;
  margin: 0 auto;
`;
export const RecentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RecentTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const RecentMore = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-base-90);
  text-decoration: underline;

  &:hover {
    color: var(--accent);
  }
`;
