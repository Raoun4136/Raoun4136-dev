import Link from 'next/link';
import {
  AboutHeaderTitle,
  AboutNav,
  AboutLink,
  AboutHeaderContainer,
} from './AboutHeader.style';

const AboutHeader = () => {
  return (
    <AboutHeaderContainer>
      <AboutHeaderTitle>ABOUTS</AboutHeaderTitle>
      <AboutNav>
        <AboutLink>
          <Link href="">ALL</Link>
        </AboutLink>
        <AboutLink>
          <Link href="">ALL</Link>
        </AboutLink>
        <AboutLink>
          <Link href="">ALL</Link>
        </AboutLink>
      </AboutNav>
    </AboutHeaderContainer>
  );
};
export default AboutHeader;
