import { RouterPath } from '@/components/lib/constant';
import { PostType } from '@/components/lib/type';
import { format } from 'date-fns';
import Link from 'next/link';

const PostLi = ({ title, date, slug }: PostType & { slug: string }) => {
  return (
    <Link className="block" href={`${RouterPath.POSTS}/${slug}`}>
      <div className="group py-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-normal group-hover:underline max-sm:text-sm">{title}</p>
          <span className="whitespace-nowrap text-xs font-light opacity-70 max-sm:text-xs">
            {format(date, 'yyyy-MM-dd')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostLi;
