'use client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <Alert className="my-6">
        <AlertTitle>
          <span>페이지를 찾을 수 없습니다</span>
        </AlertTitle>
        <AlertDescription className="text-primary/80">
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
        </AlertDescription>
      </Alert>
      <Button asChild variant="outline">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>홈으로 돌아가기</span>
        </Link>
      </Button>
    </section>
  );
}
