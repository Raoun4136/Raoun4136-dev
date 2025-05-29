import NoteLi from './_ui/note-li';
import { Metadata } from 'next';
import useNote from './_hook/useNote';

export const metadata: Metadata = {
  title: '노트',
  description: '단순 기술 또는 배운 것들을 적는 공간',
  alternates: {
    canonical: '/notes',
  },
};

export default function Notes() {
  const notes = useNote();

  return (
    <ul className="flex flex-col gap-8">
      {notes?.map((note) => (
        <li key={note.slug}>
          <NoteLi title={note.meta.title} description={note.meta.description} date={note.meta.date} slug={note.slug} />
        </li>
      ))}
    </ul>
  );
}
