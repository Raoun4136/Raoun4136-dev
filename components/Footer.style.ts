import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  height: 112px;
  padding: 24px 12px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
`;

export const FooterInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export const BlogInfo = styled.a`
  font-size: 12px;
  color: var(--text-base);
  opacity: 0.5;
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;
