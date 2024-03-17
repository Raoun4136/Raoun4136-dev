import styled from '@emotion/styled';

export const Item = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--accent);

    h4 {
      color: var(--accent);
    }
  }
`;

export const Title = styled.h4`
  font-size: 1.5rem;
  margin: 0;

  transition: all 0.3s ease;
`;

export const Description = styled.span`
  font-size: 0.9rem;
  margin: 1rem 0 0 0;
`;
