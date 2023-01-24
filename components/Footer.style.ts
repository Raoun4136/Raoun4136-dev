import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 8rem;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
`;

export const FooterInnerContainer = styled.div``;

export const BlogInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
`;

export const BlogLink = styled.a`
  font-size: 0.8rem;
  color: var(--text-base);
  opacity: 0.6;
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
export const BlogContantContainer = styled.div`
  display: flex;
  flex: 1 1 0;
  gap: 0.6rem;
  justify-content: flex-end;
`;

export const BlogContact = styled.a``;
