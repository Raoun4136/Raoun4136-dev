import { useRouter } from 'next/router';
import { ErrorSection, ErrorTitle, HomeButton } from './ErrorPage.style';

const ErrorPage = () => {
  const router = useRouter();
  return (
    <ErrorSection>
      <ErrorTitle>404</ErrorTitle>
      <HomeButton onClick={() => router.push('/')}>홈으로 가기</HomeButton>
    </ErrorSection>
  );
};

export default ErrorPage;
