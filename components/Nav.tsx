import Link from 'next/link';
import { NavContainer } from './Nav.style';
import { useRouter } from 'next/router';
import navLinks from 'data/navLinks';
import { useStore } from 'stores/store';

const Nav = () => {
  const { menu_modal, setMenuModal } = useStore();
  const router = useRouter();
  const home_link = {
    title: 'Home',
    link: '/',
  };
  return (
    <NavContainer>
      <ul>
        {menu_modal ? (
          <li>
            <Link href={home_link.link}>
              <a
                onClick={() => setMenuModal(false)}
                className={
                  router.asPath === `${home_link.link}` ? 'active' : 'nonActive'
                }
              >
                {home_link.title}
              </a>
            </Link>
          </li>
        ) : null}
        {navLinks.map((link: any) => (
          <li key={link.title}>
            <Link
              href={link.link + (link.extra_slug ? '/' + link.extra_slug : '')}
            >
              <a
                onClick={() => setMenuModal(false)}
                className={
                  router.asPath.includes(`${link.link}`)
                    ? 'active'
                    : 'nonActive'
                }
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </NavContainer>
  );
};
export default Nav;
