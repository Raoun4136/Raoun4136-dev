import Link from 'next/link';
import { NavContainer } from './Nav.style';
import { useRouter } from 'next/router';
import navLinks from './../data/navLinks';
import { useState } from 'react';

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavContainer>
      <ul>
        {navLinks.map((link: any) => (
          <li key={link.title}>
            <Link href={link.link}>
              <a
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
