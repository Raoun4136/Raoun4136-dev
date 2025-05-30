'use client';
import { RouterPath } from '@/components/lib/constant';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <Alert className="my-6">
        <AlertTitle>
          <span>게시글을 찾을 수 없습니다</span>
        </AlertTitle>
        <AlertDescription className="text-primary/80">
          해당 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
        </AlertDescription>
      </Alert>
      <Button asChild variant="outline">
        <Link href={RouterPath.NOTES}>
          <ArrowLeftIcon className="h-4 w-4" />
          <span>목록으로 돌아가기</span>
        </Link>
      </Button>
    </section>
  );
}
