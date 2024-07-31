import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/ui/accordion';
import PostLi from './_ui/post-li';

export default function Posts() {
  return (
    <div className="mb-32 mt-16 flex w-full max-w-lg flex-col gap-8 text-left lg:h-full lg:w-full lg:max-w-5xl">
      <ul>
        <li>
          <PostLi />
        </li>
      </ul>
    </div>
  );
}
