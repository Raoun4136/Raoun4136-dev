'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type StudioSubmitButtonsProps = {
  formId: string;
};

export default function StudioSubmitButtons({ formId }: StudioSubmitButtonsProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button id={`${formId}-save-button`} type="submit" name="submitMode" value="save" disabled={pending}>
        {pending ? '저장 중…' : '저장'}
      </Button>
      <Button
        id={`${formId}-publish-button`}
        type="submit"
        name="submitMode"
        value="publish"
        variant="secondary"
        disabled={pending}
      >
        {pending ? '저장 중…' : '발행'}
      </Button>
    </div>
  );
}
