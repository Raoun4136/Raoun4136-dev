import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: '`나`에 모든 것에 대한 공간',
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <div className="mb-16 mt-8 flex flex-col gap-6 text-left opacity-90">
      <div>
        <p>이 세상에 있는</p>
        <p>모든 것을</p>
        <p>배우고 싶은</p>
        <p>
          <span className="font-semibold">프론트엔드 개발자</span> 입니다.
        </p>
      </div>
      <div>
        <p>지나가는 모든 것들을</p>
        <p>놓치지 않고 싶어</p>
        <p>블로그를 시작하게 되었습니다.</p>
      </div>
    </div>
  );
}
