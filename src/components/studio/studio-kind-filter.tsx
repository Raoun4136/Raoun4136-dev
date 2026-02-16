'use client';

import { ChevronDown } from 'lucide-react';

type StudioKindFilterProps = {
  defaultValue: 'all' | 'post' | 'note';
};

export default function StudioKindFilter({ defaultValue }: StudioKindFilterProps) {
  return (
    <div className="relative col-span-2">
      <select
        name="kind"
        defaultValue={defaultValue}
        className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm"
        onChange={(event) => {
          event.currentTarget.form?.requestSubmit();
        }}
      >
        <option value="all">모든 타입</option>
        <option value="post">post</option>
        <option value="note">note</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60" />
    </div>
  );
}
