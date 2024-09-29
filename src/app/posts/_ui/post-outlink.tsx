import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const PostOutlink = ({ title, date, link }: { title: string; date: Date; link: string }) => {
  return (
    <a href={link} target="_blank" rel="nooener noreferrer">
      <div className="flex items-center justify-between gap-2">
        <p className="external-link font-medium opacity-90">{title}</p>
        <span className="whitespace-nowrap text-xs font-extralight">{format(date, 'yyyy-MM-dd')}</span>
      </div>
      <Separator className="mt-4" />
    </a>
  );
};

export default PostOutlink;
