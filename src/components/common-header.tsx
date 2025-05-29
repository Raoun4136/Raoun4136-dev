import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

const Header = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header className="w-full max-w-2xl" {...props}>
      {children}
    </header>
  );
};

const HeaderTitle = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex items-center justify-between" {...props}>
      {children}
    </div>
  );
};

const HeaderRouter = () => {
  return (
    <div className="mt-2 flex items-start gap-2">
      <Link href="/" className="py-2 pr-2 text-sm hover:underline">
        <h2>홈</h2>
      </Link>
      <Link href="/posts" className="py-2 pr-2 text-sm hover:underline">
        <h2>글</h2>
      </Link>
      <Link href="/notes" className="py-2 pr-2 text-sm hover:underline">
        <h2>노트</h2>
      </Link>
    </div>
  );
};

const HeaderSearch = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" disabled>
            <SearchIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>검색 기능은 준비 중입니다.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Header, HeaderTitle, HeaderRouter, HeaderSearch };
