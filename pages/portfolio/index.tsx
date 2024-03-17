import Container from 'components/Container';
import PortfolioItem from 'components/portfolio/PortfolioItem';

export default function Portfolio(): JSX.Element {
  return (
    <Container>
      <PortfolioItem
        title="Recent"
        description="현재 작성중인 포트폴리오입니다."
        link="https://raoun4136.notion.site/Raoun-f3f0c035828d491a8a95845bbf14de02"
      />
      <PortfolioItem
        title="Intern"
        description="인턴 지원 시 사용했던 포트폴리오입니다."
        link="https://raoun4136.notion.site/Raoun-022bd0edfdf24844b709de09b554629e"
      />
    </Container>
  );
}
