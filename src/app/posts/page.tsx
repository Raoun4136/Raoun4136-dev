import PostLi from './_ui/post-li';
import PostOutlink from './_ui/post-outlink';
import usePost from './_hook/usePost';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import { StudioNewContentButton } from '@/components/studio/studio-entry-actions';
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

export default async function Posts() {
  const blogs = await usePost();

  return (
    <section>
      <div className="mb-2 flex justify-end">
        <StudioNewContentButton type="post" />
      </div>
      <ul className="group/ul flex flex-col">
        {blogs?.map((blog, index) => {
          const revealStyle = {
            animation: 'home-list-reveal 620ms cubic-bezier(0.22, 1, 0.36, 1) backwards',
            animationDelay: `${Math.min(index, 18) * 68}ms`,
          } as const;

          if (blog.meta.outlink && !blog.meta.showFull) {
            // 외부링크만 있는 경우
            return (
              <li
                key={blog.slug}
                className="transition-opacity duration-200 hover:opacity-100 motion-reduce:[animation:none] [&:not(:hover)]:group-hover/ul:opacity-50"
                style={revealStyle}
              >
                <PostOutlink {...blog.meta} />
              </li>
            );
          }
          return (
            <li
              key={blog.slug}
              className="transition-opacity duration-200 hover:opacity-100 motion-reduce:[animation:none] [&:not(:hover)]:group-hover/ul:opacity-50"
              style={revealStyle}
            >
              <PostLi {...blog.meta} slug={blog.slug} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
