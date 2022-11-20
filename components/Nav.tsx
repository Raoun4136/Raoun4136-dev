import Link from 'next/link';
import { NavContainer } from './Nav.style';

const Nav = () => {
  return (
    <NavContainer>
      <Link href="/dev">Dev</Link>
      <Link href="/daily">Daily</Link>
      <Link href="https://raoun4136.notion.site/Raoun-022bd0edfdf24844b709de09b554629e">
        Portfolio
      </Link>
    </NavContainer>
  );
};
export default Nav;
