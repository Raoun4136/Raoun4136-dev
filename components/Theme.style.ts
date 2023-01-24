import styled from '@emotion/styled';

export const ThemeContainer = styled.div`
  line-height: 0;
  margin-left: 2rem;
`;

export const ToggleButton = styled.button`
  background: var(--hover-base);
  background: var(--toggle-bg);
  padding-top: 3px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  img {
    fill: var(--text-base-70);
  }

  &:hover {
    border-color: var(--toggle-border);
    cursor: pointer;
  }
`;
