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
  font-size: var(--intro-font-size);
  font-weight: var(--intro-font-weight);
`;

export const RecentMore = styled.span`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
  color: var(--text-base-90);
  text-decoration: underline;

  &:hover {
    color: var(--accent);
  }
`;
