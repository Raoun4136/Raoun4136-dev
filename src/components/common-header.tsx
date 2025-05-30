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

type HeaderRouterProps = { pathname: string };

const HeaderRouter = ({ pathname }: HeaderRouterProps) => {
  const navItems = [
    { href: '/', label: '홈' },
    { href: '/posts', label: '글' },
    { href: '/notes', label: '노트' },
  ];

  return (
    <div className="mt-2 flex items-start gap-2">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`py-2 pr-2 text-sm opacity-70 hover:underline hover:opacity-100 ${pathname === href ? 'font-bold opacity-100' : ''}`}
        >
          <h2>{label}</h2>
        </Link>
      ))}
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
