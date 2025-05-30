import { Header, HeaderRouter, HeaderTitle, HeaderSearch } from '@/components/common-header';
import { metadata } from './page';
import { Separator } from '@/components/ui/separator';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <HeaderTitle>
          <h1 className="font-serif font-semibold">{metadata?.title as string}</h1>

          <HeaderSearch />
        </HeaderTitle>
        <p className="text-sm opacity-70">{metadata?.description}</p>
        <HeaderRouter pathname="/notes" />
      </Header>

      <Separator />
      <div className="mb-4 mt-8">{children}</div>
    </>
  );
};

export default NotesLayout;
