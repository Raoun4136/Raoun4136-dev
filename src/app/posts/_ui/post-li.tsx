import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import Link from 'next/link';

const PostLi = ({
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
    <Link className="group" href={`posts/${slug}`}>
      <p className="font-medium group-hover:underline">{title}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap break-all text-sm font-extralight">
          {description}
        </p>
        <span className="whitespace-nowrap text-xs font-extralight">{format(date, 'yyyy-MM-dd')}</span>
      </div>
      <Separator className="mt-4" />
    </Link>
  );
};

export default PostLi;
