'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type StudioStatus = {
  enabled: boolean;
  isAuthenticated: boolean;
};

const useStudioAuthStatus = () => {
  const [status, setStatus] = useState<StudioStatus>({
    enabled: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadStatus = async () => {
      try {
        const response = await fetch('/api/studio/auth/status', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = (await response.json()) as StudioStatus;
        if (controller.signal.aborted) return;
        setStatus({
          enabled: Boolean(payload.enabled),
          isAuthenticated: Boolean(payload.isAuthenticated),
        });
      } catch {
        // Keep hidden when auth status cannot be resolved.
      }
    };

    void loadStatus();

    return () => controller.abort();
  }, []);

  return status;
};

type StudioNewContentButtonProps = {
  type: 'post' | 'note';
  className?: string;
};

export const StudioNewContentButton = ({ type, className }: StudioNewContentButtonProps) => {
  const status = useStudioAuthStatus();
  if (!status.enabled || !status.isAuthenticated) return null;

  const href = `/studio/new/${type}` as const;
  const label = type === 'post' ? '새 글 쓰기' : '새 노트 쓰기';

  return (
    <Link href={href} className={cn('inline-flex', className)}>
      <Button type="button" variant="outline">
        {label}
      </Button>
    </Link>
  );
};

type StudioEditContentButtonProps = {
  contentId: number | null | undefined;
  className?: string;
};

export const StudioEditContentButton = ({ contentId, className }: StudioEditContentButtonProps) => {
  const status = useStudioAuthStatus();
  if (!contentId) return null;
  if (!status.enabled || !status.isAuthenticated) return null;

  return (
    <Link href={`/studio?id=${contentId}`} className={cn('inline-flex', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Edit content"
        className="h-7 w-7 border-0 p-0 shadow-none"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span className="sr-only">편집</span>
      </Button>
    </Link>
  );
};
