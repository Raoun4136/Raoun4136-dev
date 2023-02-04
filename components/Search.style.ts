import styled from '@emotion/styled';

export const SearchContainer = styled.div`
  line-height: 0;
  margin-left: 1rem;
`;

export const SearchButton = styled.button`
  background: var(--bg);
  padding-top: 3px;
  border-radius: 10px;
  border: 2px solid transparent;
  width: max-content;
  svg {
    width: 20px;
    height: 20px;
    fill: var(--text-base);
  }

  &:hover {
    border-color: var(--toggle-border);
    cursor: pointer;
  }
`;
