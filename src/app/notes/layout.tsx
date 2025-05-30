import { Header, HeaderRouter, HeaderTitle, HeaderSearch } from '@/components/common-header';
import { Separator } from '@/components/ui/separator';
import { RouterPath } from '@/components/lib/constant';
import usePost from '@/app/posts/_hook/usePost';
import useNote from '@/app/notes/_hook/useNote';
import { metadata } from './page';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  const posts = usePost();
  const notes = useNote();

  return (
    <>
      <Header>
        <HeaderTitle>
          <h1 className="font-serif font-semibold">{metadata?.title as string}</h1>

          <HeaderSearch posts={posts} notes={notes} />
        </HeaderTitle>
        <p className="text-sm opacity-70">{metadata?.description}</p>
        <HeaderRouter pathname={RouterPath.NOTES} />
      </Header>

      <Separator />
      <div className="mb-4 mt-8">{children}</div>
    </>
  );
};

export default NotesLayout;
