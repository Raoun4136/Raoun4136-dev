import Link from 'next/link';
import { Nav, Theme, Search } from 'components';
import {
  HeaderContainer,
  HeaderLogo,
  DesktopHeader,
  MobileHeader,
  IconContainer,
} from './Header.style';
import { useStore } from 'stores/store';
import { Menu } from 'components';

const Header = () => {
  const { menu_modal } = useStore();

  return (
    <HeaderContainer>
      <DesktopHeader>
        <Link href="/">
          <HeaderLogo>
            <span>//</span> Raoun<span>.</span>me
          </HeaderLogo>
        </Link>
        <Nav />
        <IconContainer>
          <Theme />
          {/* <Search /> */}
        </IconContainer>
      </DesktopHeader>
      <MobileHeader className={menu_modal ? 'open' : 'close'}>
        <Menu />
        {menu_modal ? <Nav /> : null}
        <IconContainer className={menu_modal ? 'open' : 'close'}>
          <Theme />
          {/* <Search /> */}
        </IconContainer>
      </MobileHeader>
    </HeaderContainer>
  );
};

export default Header;
