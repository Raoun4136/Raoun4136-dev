import LinkButton from '@/components/link-button';
import { ModeToggle } from '@/components/mode-toggle';
import { Github } from 'lucide-react';

export default function About() {
  return (
    <div className="mb-32 mt-16 flex flex-col gap-16 text-left lg:h-full lg:w-full lg:max-w-5xl">
      <div>
        <p>이 세상에 있는</p>
        <p>모든 것을</p>
        <p>배우고 싶은</p>
        <p>
          <span className="font-bold">프론트엔드 개발자</span> 입니다.
        </p>
      </div>
    </div>
  );
}
