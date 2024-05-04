import styled from '@emotion/styled';

export const Item = styled.div`
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    h4 {
      color: var(--accent);
    }
  }
`;

export const Title = styled.h4`
  font-size: 1.2rem;
  margin: 0;

  transition: all 0.3s ease;
`;

export const Description = styled.span`
  font-size: 0.9rem;
  margin: 1rem 0 0 0;
`;
