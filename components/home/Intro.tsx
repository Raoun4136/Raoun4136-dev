import {
  IntroSection,
  IntroTitle,
  IntroDetail,
  IntroButton,
} from './Intro.style';
import Link from 'next/link';

const Intro = () => {
  return (
    <IntroSection>
      <IntroTitle>박성오 | Raoun</IntroTitle>
      <IntroDetail>프론트엔드 개발자 라운입니다</IntroDetail>
      <IntroButton>
        <Link href="/about">더보기</Link>
      </IntroButton>
    </IntroSection>
  );
};

export default Intro;
