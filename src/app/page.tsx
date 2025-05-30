import LinkButton from '@/components/link-button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AtSignIcon, GithubIcon, InstagramIcon, LinkedinIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import usePost from './posts/_hook/usePost';
import useNote from './notes/_hook/useNote';
import { Header, HeaderSearch, HeaderTitle } from '@/components/common-header';

export default function Home() {
  const posts = usePost();
  const notes = useNote();

  return (
    <>
      <Header>
        <HeaderTitle>
          <h1 className="font-serif font-semibold">박성오 · Raoun</h1>

          <HeaderSearch />
        </HeaderTitle>
      </Header>

      <div className="mb-16 mt-8 flex flex-col gap-6 text-left">
        <div className="text-foreground">
          <p>반복되는 일을 자동화하고, 더 나은 개발 환경과 사용자 경험을 개선해 나가는 과정을 좋아합니다.</p>
          <p>효율적인 구조, 실용적인 접근을 바탕으로 틈틈이 실험하고 배운 것들을 기록하려 합니다.</p>
        </div>

        <p>
          현재{' '}
          <a className="external-link" href="https://featuring.co" target="_blank">
            Featuring
          </a>
          에서 <b>프론트엔드 개발자</b>로 일하고 있습니다.
        </p>
        <div className="flex gap-1">
          <LinkButton href="mailto:qkrtjddh1212@naver.com" variant="outline" size="icon">
            <AtSignIcon />
          </LinkButton>
          <LinkButton href="https://www.instagram.com/park__55555/" target="_blank" variant="outline" size="icon">
            <InstagramIcon />
          </LinkButton>
          <LinkButton href="https://github.com/Raoun4136" target="_blank" variant="outline" size="icon">
            <GithubIcon />
          </LinkButton>
          <LinkButton href="https://www.linkedin.com/in/raoun4136/" target="_blank" variant="outline" size="icon">
            <LinkedinIcon />
          </LinkButton>
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-2">
        <LinkButton variant="ghost" href="/posts" className="group flex w-fit items-center gap-2">
          <h2 className="text-md font-medium">글</h2>·
          <p className="m-0 max-w-[30ch] text-sm opacity-70">경험을 바탕으로 나의 생각을 작성하는 공간</p>
        </LinkButton>

        <ul className="ml-4 flex flex-col items-start gap-4 rounded-md border-b border-l pb-4 pl-4">
          {posts?.slice(0, 3).map((post) => {
            if (post.meta?.outlink && !post.meta?.showFull) {
              return (
                <Link
                  key={post.slug}
                  href={post.meta?.outlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <li className="flex w-full items-center gap-1 text-left text-sm hover:underline">
                    {post.meta?.title}
                  </li>
                </Link>
              );
            }
            return (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="w-full">
                <li className="text-left text-sm hover:underline">{post.meta?.title}</li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <LinkButton variant="ghost" href="/notes" className="group flex w-fit items-center gap-2">
          <h2 className="text-md font-medium">노트</h2>·
          <p className="m-0 max-w-[30ch] text-sm opacity-70">단순 기술 또는 배운 것들을 적는 공간</p>
        </LinkButton>

        <ul className="ml-4 flex flex-col items-start gap-4 rounded-md border-b border-l pb-4 pl-4">
          {notes?.slice(0, 3).map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="w-full">
              <li className="text-left text-sm hover:underline">{note.meta?.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
