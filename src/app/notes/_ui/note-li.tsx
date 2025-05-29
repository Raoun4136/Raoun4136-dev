import { format } from 'date-fns';
import Link from 'next/link';

const NoteLi = ({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: Date;
  slug: string;
}) => {
  return (
    <Link className="group" href={`notes/${slug}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-base font-normal group-hover:underline">{title}</p>
        <span className="whitespace-nowrap text-xs font-light opacity-70">{format(date, 'yyyy-MM-dd')}</span>
      </div>
    </Link>
  );
};

export default NoteLi;
