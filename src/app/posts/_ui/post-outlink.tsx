import { format } from 'date-fns';
import { PostType } from '@/components/lib/type';

const PostOutlink = ({ title, date, outlink }: PostType) => {
  return (
    <a href={outlink} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center justify-between gap-2 py-4">
        <p className="external-link text-base font-normal max-sm:text-sm">{title}</p>
        <span className="whitespace-nowrap text-xs font-light opacity-70 max-sm:text-xs">
          {format(date, 'yyyy-MM-dd')}
        </span>
      </div>
    </a>
  );
};

export default PostOutlink;
