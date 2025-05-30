import PostLi from './_ui/post-li';
import PostOutlink from './_ui/post-outlink';
import usePost from './_hook/usePost';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: '글',
  description: '경험을 바탕으로 나의 생각을 작성하는 공간',
  alternates: {
    canonical: RouterPath.POSTS,
  },
  openGraph: {
    ...CommonMetaData.openGraph,
    url: RouterPath.POSTS,
  },
};

export default function Posts() {
  const blogs = usePost();

  return (
    <ul className="group/ul flex flex-col">
      {blogs?.map((blog) => {
        if (blog.meta.outlink && !blog.meta.showFull) {
          // 외부링크만 있는 경우
          return (
            <li
              key={blog.slug}
              className="opacity-100 transition-opacity hover:opacity-100 [&:not(:hover)]:group-hover/ul:opacity-70"
            >
              <PostOutlink {...blog.meta} />
            </li>
          );
        }
        return (
          <li
            key={blog.slug}
            className="opacity-100 transition-opacity hover:opacity-100 [&:not(:hover)]:group-hover/ul:opacity-70"
          >
            <PostLi {...blog.meta} slug={blog.slug} />
          </li>
        );
      })}
    </ul>
  );
}
