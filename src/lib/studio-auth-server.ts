import { cookies } from 'next/headers';
import { isStudioEnabled, isStudioSessionTokenValid, STUDIO_AUTH_COOKIE } from '@/lib/studio-auth';

export const isStudioAuthenticated = async () => {
  if (!isStudioEnabled) return false;
  const cookieStore = await cookies();
  return isStudioSessionTokenValid(cookieStore.get(STUDIO_AUTH_COOKIE)?.value);
};
