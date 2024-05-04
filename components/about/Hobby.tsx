import {
  HobbyHeader,
  HobbySection,
  HobbyLink,
  HobbyItemWrapper,
  HobbyDesc,
} from './Hobby.style';
import Link from 'next/link';

const Hobby = () => {
  return (
    <HobbySection>
      <HobbyHeader>작성중입니다...</HobbyHeader>
      {/* <HobbyItemWrapper>
        <Link href="/toy/game">
          <HobbyLink>Car Game</HobbyLink>
        </Link>
        <HobbyDesc>- React Three.js로 만든 자동차 3D 게임입니다.</HobbyDesc>
      </HobbyItemWrapper> */}
    </HobbySection>
  );
};

export default Hobby;
