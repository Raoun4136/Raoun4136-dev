import Link from 'next/link';
import Nav from './Nav';
import Theme from './Theme';
import Search from './Search';
import { HeaderContainer, InnerHeader, HeaderLogo } from './Header.style';

const Header = () => {
  //TODO: theme day | night

  return (
    <HeaderContainer>
      <InnerHeader>
        <Link href="/">
          <HeaderLogo>Raoun.dev</HeaderLogo>
        </Link>
        <Nav />
        <Theme />
        <Search />
      </InnerHeader>
    </HeaderContainer>
  );
};

export default Header;
