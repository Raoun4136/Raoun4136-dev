'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type StudioLoginErrorToastProps = {
  hasError: boolean;
};

export default function StudioLoginErrorToast({ hasError }: StudioLoginErrorToastProps) {
  useEffect(() => {
    if (!hasError) return;
    toast.error('Sign-in failed', {
      id: 'studio-login-error',
      description: 'Username or password is incorrect.',
    });
  }, [hasError]);

  return null;
}
