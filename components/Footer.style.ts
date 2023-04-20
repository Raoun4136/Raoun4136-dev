import styled from '@emotion/styled';

export const FooterContainer = styled.footer`
  display: block;
  width: 100%;
  border-top: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
`;

export const FooterInnerContainer = styled.div`
  display: flex;
  max-width: 768px;
  align-items: center;
  height: 5rem;
  margin: 0 auto;

  @media screen and (max-width: 480px) {
    max-width: 252px;
    flex-direction: column;
    gap: 16px;
    height: auto;
  }
`;

export const FooterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;

export const BlogInfo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
`;

export const BlogLink = styled.a`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-base-90);
  &:hover {
    color: var(--text-base);
    text-decoration: underline;
  }
`;

export const BlogContantContainer = styled.div`
  display: flex;
  flex: 1 1 0;
  gap: 0.6rem;
  justify-content: flex-end;

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const BlogContact = styled.a`
  svg {
    width: 30px;
    height: 30px;
    stroke: var(--text-base);
    &:hover {
      stroke: var(--accent);
    }
    transition: 0.3s;
  }
`;
