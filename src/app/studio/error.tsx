'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type StudioErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const toErrorDescription = (error: Error) => {
  const message = error.message?.trim();
  if (!message) return '알 수 없는 오류가 발생했습니다.';
  return message;
};

export default function StudioErrorPage({ error, reset }: StudioErrorPageProps) {
  useEffect(() => {
    toast.error('Studio error', {
      id: 'studio-page-error',
      description: toErrorDescription(error),
    });
  }, [error]);

  return (
    <section className="mx-auto max-w-[760px] py-8">
      <div className="rounded-xl border border-destructive/35 bg-destructive/10 p-5">
        <h1 className="text-lg font-semibold text-destructive">Studio 작업 중 오류가 발생했습니다.</h1>
        <p className="mt-2 text-sm text-destructive/90">{toErrorDescription(error)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={reset}>
            다시 시도
          </Button>
          <Link href="/studio">
            <Button type="button" variant="outline">
              Studio로 이동
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
