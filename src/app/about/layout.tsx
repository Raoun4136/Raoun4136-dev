import { Header, HeaderTitle, HeaderSearch } from '@/components/common-header';
import { Separator } from '@/components/ui/separator';
import useNote from '@/app/notes/_hook/useNote';
import usePost from '@/app/posts/_hook/usePost';
import { metadata } from './page';

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
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
      </Header>

      <Separator className="mt-5" />
      <div className="mb-4 mt-8">{children}</div>
    </>
  );
};

export default AboutLayout;
