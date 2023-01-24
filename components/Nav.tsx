import Link from 'next/link';
import { NavContainer } from './Nav.style';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  return (
    <NavContainer>
      <Link href="/about">
        <a
          className={
            router.pathname.includes('/about') ? 'active' : 'nonActive'
          }
        >
          About
        </a>
      </Link>
      <Link href="/posts/all">
        <a
          className={
            router.pathname.includes('/posts') ? 'active' : 'nonActive'
          }
        >
          Posts
        </a>
      </Link>
      <Link href="https://raoun4136.notion.site/Raoun-022bd0edfdf24844b709de09b554629e">
        <a target="_blank" rel="noopener noreferrer">
          Portfolio
        </a>
      </Link>
    </NavContainer>
  );
};
export default Nav;
