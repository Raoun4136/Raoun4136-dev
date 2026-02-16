import NoteLi from './_ui/note-li';
import useNote from './_hook/useNote';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
import { StudioNewContentButton } from '@/components/studio/studio-entry-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: '노트',
  description: '단순 기술 또는 배운 것들을 적는 공간',
  alternates: {
    canonical: RouterPath.NOTES,
  },
  openGraph: {
    ...CommonMetaData.openGraph,
    url: RouterPath.NOTES,
  },
};

export default async function Notes() {
  const notes = await useNote();

  return (
    <section>
      <ul className="group/ul flex flex-col">
        <StudioNewContentButton type="note" mode="list-item" />
        {notes?.map((note, index) => (
          <li
            key={note.slug}
            className="transition-opacity duration-200 hover:opacity-100 motion-reduce:[animation:none] [&:not(:hover)]:group-hover/ul:opacity-50"
            style={{
              animation: 'home-list-reveal 620ms cubic-bezier(0.22, 1, 0.36, 1) backwards',
              animationDelay: `${Math.min(index + 1, 19) * 68}ms`,
            }}
          >
            <NoteLi {...note.meta} slug={note.slug} />
          </li>
        ))}
      </ul>
    </section>
  );
}
