import Link from 'next/link';
import { NavContainer } from './Nav.style';

const Nav = () => {
  return (
    <NavContainer>
      <Link href="/about">About</Link>
      <Link href="/posts/all">Posts</Link>
      <Link href="https://raoun4136.notion.site/Raoun-022bd0edfdf24844b709de09b554629e">
        Portfolio
      </Link>
    </NavContainer>
  );
};
export default Nav;
