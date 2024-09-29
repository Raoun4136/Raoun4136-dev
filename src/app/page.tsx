import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] mb-4 mt-4 flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-1/2 after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px]">
        <Image
          className="relative px-4 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/raoun.svg"
          alt="Raoun.me Logo"
          width={420}
          height={76}
          priority
        />
      </div>

      <div className="mb-16 mt-8 grid text-center">
        <Link
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="text-md mb-2 font-medium opacity-90">
            소개{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">`나`에 모든 것에 대한 공간</p>
        </Link>

        <Link
          href="/posts"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="text-md mb-2 font-medium opacity-90">
            글{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">경험을 바탕으로 나의 생각을 작성하는 공간</p>
        </Link>

        <Link
          href="/notes"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="text-md mb-2 font-medium opacity-90">
            노트{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">단순 기술 또는 배운 것들을 적는 공간</p>
        </Link>

        <Link
          href="/resume"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-md mb-2 font-medium opacity-90">
            이력서{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-70">Figma로 한땀한땀 작성한 PDF 이력서</p>
        </Link>
      </div>
    </>
  );
}
