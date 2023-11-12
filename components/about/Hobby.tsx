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
      <HobbyHeader>📍개인 프로젝트</HobbyHeader>
      <HobbyItemWrapper>
        <Link href="/toy/game">
          <HobbyLink>Car Game</HobbyLink>
        </Link>
        <HobbyDesc>
          ✔️ 학교 프로젝트[컴퓨터게임설계]로 만들고 있는 게임입니다.
        </HobbyDesc>
      </HobbyItemWrapper>
    </HobbySection>
  );
};

export default Hobby;
