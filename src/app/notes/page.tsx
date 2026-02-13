import NoteLi from './_ui/note-li';
import useNote from './_hook/useNote';
import { CommonMetaData, RouterPath } from '@/components/lib/constant';
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

export default function Notes() {
  const notes = useNote();

  return (
    <ul className="group/ul flex flex-col">
      {notes?.map((note, index) => (
        <li
          key={note.slug}
          className="opacity-0 transition-opacity hover:opacity-100 [&:not(:hover)]:group-hover/ul:opacity-70"
          style={{
            animation: 'home-list-reveal 820ms cubic-bezier(0.22,1,0.36,1) forwards',
            animationDelay: `${110 + index * 75}ms`,
          }}
        >
          <NoteLi {...note.meta} slug={note.slug} />
        </li>
      ))}
    </ul>
  );
}
