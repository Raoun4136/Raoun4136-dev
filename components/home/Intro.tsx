import Link from 'next/link';
import {
  IntroContainer,
  IntroTitle,
  IntroDetail,
  IntroButton,
  IntroAbout,
  IntroInnerContainer,
} from './Intro.style';

const Intro = () => {
  return (
    <IntroContainer>
      <IntroInnerContainer>
        <IntroTitle>Just Do It!</IntroTitle>
        <IntroDetail>일단 해보는거야</IntroDetail>
        <IntroButton>
          <Link href="/about">About Me?</Link>
        </IntroButton>
      </IntroInnerContainer>
    </IntroContainer>
  );
};

export default Intro;
