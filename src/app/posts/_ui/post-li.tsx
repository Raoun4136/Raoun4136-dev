import LinkButton from '@/components/link-button';
import { format } from 'date-fns';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import Link from 'next/link';

const PostLi = ({
  title,
  description,
  date,
  slug,
  outlink,
}: {
  title: string;
  description: string;
  date: Date;
  slug: string;
  outlink?: string;
}) => {
  return (
    <div className="group">
      <Link className="block" href={`posts/${slug}`}>
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-normal group-hover:underline max-sm:text-sm">{title}</p>
          <span className="whitespace-nowrap text-xs font-light opacity-70 max-sm:text-xs">
            {format(date, 'yyyy-MM-dd')}
          </span>
        </div>
      </Link>
      {outlink && (
        <LinkButton href={outlink} target="_blank" variant="outline" className="my-2 w-full" size={'sm'}>
          외부 글 보러가기
          <ArrowUpRightFromSquareIcon />
        </LinkButton>
      )}
    </div>
  );
};

export default PostLi;
