import { format } from 'date-fns';

const PostOutlink = ({ title, date, link }: { title: string; date: Date; link: string }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center justify-between gap-2">
        <p className="external-link text-base font-normal">{title}</p>
        <span className="whitespace-nowrap text-xs font-light opacity-70">{format(date, 'yyyy-MM-dd')}</span>
      </div>
    </a>
  );
};

export default PostOutlink;
