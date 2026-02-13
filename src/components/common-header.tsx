import Link from 'next/link';
import { RouterPath } from './lib/constant';
import SearchMenu from './search-menu';
import { PostType, NoteType } from './lib/type';

const Header = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header className="w-full" {...props}>
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
    { href: RouterPath.HOME, label: '홈' },
    { href: RouterPath.POSTS, label: '글' },
    { href: RouterPath.NOTES, label: '노트' },
  ];

  return (
    <div className="mt-2 flex items-start gap-2">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`py-2 pr-2 text-sm hover:underline hover:opacity-100 ${pathname === href ? 'font-bold opacity-100' : 'opacity-70'}`}
        >
          <h2>{label}</h2>
        </Link>
      ))}
    </div>
  );
};

const HeaderSearch = ({
  posts,
  notes,
}: {
  posts: { meta: PostType; slug: string }[];
  notes: { meta: NoteType; slug: string }[];
}) => {
  return <SearchMenu posts={posts} notes={notes} />;
};

export { Header, HeaderTitle, HeaderRouter, HeaderSearch };
