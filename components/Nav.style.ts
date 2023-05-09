import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const NavContainer = styled(motion.nav)`
  width: 100%;
  transition: 0.2s;

  ul {
    justify-content: flex-end;
    display: flex;
    gap: 2rem;
    opacity: 1;
    font-size: 1rem;
    font-weight: 500;
  }
  li {
    &:hover {
      opacity: 1;
      color: var(--accent);
      transition: 0.2s;
    }
  }
  .active {
    opacity: 1;
    color: var(--accent);
  }

  @media screen and (max-width: 600px) {
    ul {
      flex-direction: column;
      margin-left: 0.5rem;
    }
  }
`;
