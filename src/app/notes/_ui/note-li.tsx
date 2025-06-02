import { format } from 'date-fns';
import Link from 'next/link';
import { NoteType } from '@/components/lib/type';
import { RouterPath } from '@/components/lib/constant';

const NoteLi = ({ title, date, slug }: NoteType & { slug: string }) => {
  return (
    <Link className="group" href={`${RouterPath.NOTES}/${slug}`}>
      <div className="flex items-center justify-between gap-2 py-4">
        <p className="text-base font-normal group-hover:underline max-sm:text-sm">{title}</p>
        <span className="whitespace-nowrap text-xs font-light opacity-70 max-sm:text-xs">
          {format(date, 'yyyy-MM-dd')}
        </span>
      </div>
    </Link>
  );
};

export default NoteLi;
