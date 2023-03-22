import {
  ProjectsSection,
  ProjectInnerContainer,
  ProjectSection,
  ProjectTitle,
  ProjectDesc,
  ProjectDate,
  ProjectInfo,
  ProjectInfoTitle,
  ProjectImg,
} from './Projects.style';
import Link from 'next/link';
import Image from 'next/image';

const projectList: {
  title: string;
  desc: string;
  date: string;
  link: string;
  image: string;
}[] = [
  {
    title: 'TellingMe',
    desc: '텔링미는 지친 나를 되돌아볼 수 있는 자기문답 다이어리 입니다. 모두가 스스로 나 자신을 돌보는 건강한 사회를 향해 나아가는 플랫폼입니다.',
    date: 'Mar, 2023 - ',
    link: '/',
    image: 'tellingme',
  },
  {
    title: '색칠쏙쏙',
    desc: '색칠쏙쏙은 밑그림을 그리기 어려운 유아들과 일상 사진들을 찍어 그림으로 남기고 싶은 사람들을 위한 자동 도면화 & 색칠 어플입니다. 사용자는 자동 도면화된 사진들을 앨범 형태로 간직할 수 있고 색칠하여 다른 사용자에게 공유할 수 있습니다.',
    date: 'Sep, 2022 - Dec, 2022',
    link: '/',
    image: 'ssokssok',
  },
  {
    title: '동문네트워크',
    desc: '중앙대학교 컴퓨터공학과 & 소프트웨어학과 사람들을 위한 커뮤니티 웹/앱 서비스입니다. 학생회의 전반적인 사업공지와 사물함 신청 및 반납, 그리고 동아리 관리 서비스를 제공해주는 동문네트워크입니다.',
    date: 'Mar, 2022 - Jun, 2022',
    link: '/',
    image: 'causw',
  },
  {
    title: 'TripBook',
    desc: '‘트립북’은 여행사진과 코멘트 그리고 다양한 컨텐츠들을 코스형식의 다이어리로 저장&공유할 수 있는 어플리케이션 서비스입니다. 자신이 다녀온 여행코스와 그 사진 등의 컨텐츠를 간편하게 온라인에 저장 가능하며, 언제든지 꺼내볼 수 있고 공유할 수 있습니다. 스토리가 있는 여행 ‘코스’형태의 다이어리라는 점이 이 서비스의 핵심입니다.',
    date: 'Jan, 2022 - Mar, 2022',
    link: '/',
    image: 'tripbook',
  },
];
const Projects = () => {
  return (
    <ProjectsSection>
      <h2>프로젝트</h2>
      <ProjectInnerContainer>
        {projectList.map((project, idx) => (
          <ProjectSection key={idx}>
            <ProjectDate>{project.date}</ProjectDate>
            <ProjectInfo>
              <ProjectInfoTitle>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Link href={project.link}>프로젝트 상세 보기</Link>
              </ProjectInfoTitle>
              <ProjectDesc>{project.desc}</ProjectDesc>
              <ProjectImg>
                <Image
                  src={`/home/projects/${project.image}.png`}
                  width="100%"
                  height="50rem"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="50% 50%"
                ></Image>
              </ProjectImg>
            </ProjectInfo>
          </ProjectSection>
        ))}
      </ProjectInnerContainer>
    </ProjectsSection>
  );
};

export default Projects;
