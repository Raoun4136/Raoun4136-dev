import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const PostLi = () => {
  return (
    <Link className="hover:first-line:underline" href="">
      <p className="font-semibold">Post Title</p>
      <div className="flex justify-between gap-2">
        <p className="text-sm font-extralight">Post Description</p>
        <span className="text-sm font-extralight">2024-04-02</span>
      </div>
      <Separator className="mt-4" />
    </Link>
  );
};

export default PostLi;
