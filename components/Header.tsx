import Link from 'next/link';
import Nav from './Nav';
import {
  HeaderContainer,
  InnerHeader,
  HeaderLogo,
  SearchImg,
} from './Header.style';
import search_night from 'public/home/search_night.svg';
import search_day from 'public/home/search_day.svg';
import Image from 'next/image';
import Theme from './Theme';
import { useEffect } from 'react';

const Header = () => {
  //TODO: theme day | night
  let search;
  useEffect(() => {
    //search = document.body.dataset.theme
    search = window.localStorage.getItem('theme');
  }, []);
  return (
    <HeaderContainer>
      <InnerHeader>
        <Link href="/">
          <HeaderLogo>Raoun.dev</HeaderLogo>
        </Link>
        <Nav />
        <Theme />
        <SearchImg>
          <Image
            src={search == 'light' ? search_day : search_night}
            width={30}
            height={30}
          ></Image>
        </SearchImg>
      </InnerHeader>
    </HeaderContainer>
  );
};

export default Header;
