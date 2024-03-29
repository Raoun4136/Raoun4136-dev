import styled from '@emotion/styled';

export const ThemeContainer = styled.div`
  line-height: 0;
  margin-left: 1.5rem;
`;

export const ToggleButton = styled.button`
  background: var(--toggle-bg);
  padding-top: 3px;
  border-radius: 10px;
  border: 2px solid transparent;
  width: max-content;

  img {
  }
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
