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
`;

export const FooterInfoContainer = styled.div``;

export const BlogInfo = styled.div`
  font-size: var(--logo-font-size);
  font-weight: var(--logo-font-weight);

  @media screen and (max-width: 480px) {
    font-size: var(--mobile-logo-font-size);
    font-weight: var(--mobile-logo-font-weight);
  }
`;

export const BlogLink = styled.a`
  font-size: var(--link-font-size);
  font-weight: var(--link-font-weight);
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

export const BlogContact = styled.a`
  svg {
    width:30px;
    height: 30px;
    stroke: var(--text-base);
    &:hover{
      stroke: var(--accent);
    }
    transition: 0.3s;
  }

}`;
