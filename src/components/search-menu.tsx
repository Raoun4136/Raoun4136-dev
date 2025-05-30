'use client';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { NoteType, PostType } from './lib/type';
import { RouterPath } from './lib/constant';
import { format } from 'date-fns';

const SearchMenu = ({
  posts,
  notes,
}: {
  posts: { meta: PostType; slug: string }[];
  notes: { meta: NoteType; slug: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  /**
   * 텍스트 내에서 검색어(value)에 해당하는 부분을 <mark>로 감싸 React 요소 배열로 반환합니다.
   * @param text - 전체 텍스트
   * @param value - 검색어
   */
  const highlight = (text: string, value: string): React.ReactNode => {
    if (!value) return text;

    // 정규식 특수문자 이스케이프
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeValue = escapeRegExp(value);
    const regex = new RegExp(`(${safeValue})`, 'gi');
    const parts = text?.split(regex);

    return parts?.map((part, idx) => (regex.test(part) ? <mark key={part + idx}>{part}</mark> : part));
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <SearchIcon />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          shouldFilter
          filter={(value: string, search: string) => {
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
          }}
          title="Search"
        >
          <CommandInput placeholder="키워드를 입력해주세요." value={value} onValueChange={setValue} />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>

            {posts?.length > 0 && (
              <CommandGroup heading="Posts">
                {posts.map((post) => {
                  return (
                    <Link key={post.slug} href={`${RouterPath.POSTS}/${post.slug}`}>
                      <CommandItem className="flex cursor-pointer items-center justify-between transition-all">
                        <div>
                          <p>{highlight(post.meta.title, value)}</p>
                          <p className="text-xs text-foreground/70">{highlight(post.meta.description, value)}</p>
                        </div>
                        <p className="flex-shrink-0 self-end text-xs text-foreground/70">
                          {highlight(format(post.meta.date, 'yyyy-MM-dd'), value)}
                        </p>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            )}

            {notes?.length > 0 && (
              <CommandGroup heading="Notes">
                {notes.map((note) => (
                  <Link key={note.slug} href={`${RouterPath.NOTES}/${note.slug}`}>
                    <CommandItem className="flex cursor-pointer items-center justify-between transition-all">
                      <div>
                        <p>{highlight(note.meta.title, value)}</p>
                        <p className="text-xs text-foreground/70">{highlight(note.meta.description, value)}</p>
                      </div>
                      <p className="flex-shrink-0 self-end text-xs text-foreground/70">
                        {highlight(format(note.meta.date, 'yyyy-MM-dd'), value)}
                      </p>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchMenu;
