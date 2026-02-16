'use client';

import { useEffect, useState } from 'react';

type StudioUnsavedGuardProps = {
  formId: string;
};

export default function StudioUnsavedGuard({ formId }: StudioUnsavedGuardProps) {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const handleInput = () => setDirty(true);
    const handleSubmit = () => setDirty(false);

    form.addEventListener('input', handleInput);
    form.addEventListener('change', handleInput);
    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('input', handleInput);
      form.removeEventListener('change', handleInput);
      form.removeEventListener('submit', handleSubmit);
    };
  }, [formId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [dirty]);

  return (
    <p aria-live="polite" className="text-xs tabular-nums text-foreground/70">
      {dirty ? '저장되지 않은 변경사항이 있어요.' : '모든 변경사항이 저장된 상태예요.'}
    </p>
  );
}
