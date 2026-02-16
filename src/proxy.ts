import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  isStudioEnabled,
  isStudioSessionTokenValid,
  sanitizeStudioNextPath,
  STUDIO_AUTH_COOKIE,
} from '@/lib/studio-auth';

const STUDIO_LOGIN_PATH = '/studio/login';

export function proxy(request: NextRequest) {
  if (!isStudioEnabled) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (pathname === STUDIO_LOGIN_PATH || pathname.startsWith(`${STUDIO_LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(STUDIO_AUTH_COOKIE)?.value;
  if (isStudioSessionTokenValid(sessionToken)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  const nextPath = sanitizeStudioNextPath(`${pathname}${search}`);

  loginUrl.pathname = STUDIO_LOGIN_PATH;
  loginUrl.search = '';
  loginUrl.searchParams.set('next', nextPath);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/studio', '/studio/:path*'],
};
