import PostLi from './_ui/post-li';
import { Metadata } from 'next';
import PostOutlink from './_ui/post-outlink';
import usePost from './_hook/usePost';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: '글',
  description: '경험을 바탕으로 나의 생각을 작성하는 공간',
  alternates: {
    canonical: '/posts',
  },
};

export default function Posts() {
  const blogs = usePost();

  return (
    <ul className="flex flex-col gap-8">
      {blogs?.map((blog) => {
        if (blog.meta.outlink && !blog.meta.showFull) {
          // 외부링크만 있는 경우
          return (
            <li key={blog.slug}>
              <PostOutlink title={blog.meta.title} date={blog.meta.date} link={blog.meta.outlink} />
            </li>
          );
        }
        return (
          <li key={blog.slug}>
            <PostLi
              title={blog.meta.title}
              description={blog.meta.description}
              date={blog.meta.date}
              slug={blog.slug}
              outlink={blog.meta?.outlink}
            />
          </li>
        );
      })}
    </ul>
  );
}
