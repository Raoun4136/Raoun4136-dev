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
        <AboutLink href="/posts/all">ALL</AboutLink>
        <AboutLink href="/posts/dev">이력</AboutLink>
        <AboutLink href="/posts/daily">TECH</AboutLink>
      </AboutNav>
    </AboutHeaderContainer>
  );
};
export default AboutHeader;
