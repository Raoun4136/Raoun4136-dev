import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'My Notes',
  alternates: {
    canonical: '/notes',
  },
};

export default function Notes() {
  return (
    <div className="mb-16 mt-8 flex w-full flex-col gap-8 text-left">
      <></>
    </div>
  );
}
