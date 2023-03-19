import {
  AboutHeaderTitle,
  AboutHeaderWelcome,
  AboutHeaderSection,
} from './AboutHeader.style';

const AboutHeader = () => {
  return (
    <AboutHeaderSection>
      <AboutHeaderWelcome>안녕하세요!</AboutHeaderWelcome>
      <AboutHeaderTitle>
        개발자 <span>박성오</span>입니다.
      </AboutHeaderTitle>
    </AboutHeaderSection>
  );
};
export default AboutHeader;
