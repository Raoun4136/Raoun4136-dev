import Link from 'next/link';
import Nav from './Nav';
import {
  HeaderContainer,
  InnerHeader,
  HeaderLogo,
  InnerTheme,
} from './Header.style';
import day from 'public/home/day.svg';
import night from 'public/home/night.svg';
import search_night from 'public/home/search_night.svg';
import search_day from 'public/home/search_day.svg';
import Image from 'next/image';

const Header = () => {
  //TODO: theme day | night
  const theme = night;
  const search = search_night;
  return (
    <HeaderContainer>
      <InnerHeader>
        <Link href="/">
          <HeaderLogo>Raoun.dev</HeaderLogo>
        </Link>
        <Nav />
        <InnerTheme>
          <Image src={theme} width={30} height={30}></Image>
        </InnerTheme>
        <InnerTheme>
          <Image src={search} width={30} height={30}></Image>
        </InnerTheme>
      </InnerHeader>
    </HeaderContainer>
  );
};

export default Header;
