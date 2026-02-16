import { NextResponse } from 'next/server';
import {
  getStudioCredentials,
  getStudioExpectedToken,
  isStudioEnabled,
  sanitizeStudioNextPath,
  STUDIO_AUTH_COOKIE,
} from '@/lib/studio-auth';

const buildLoginRedirect = (request: Request, nextPath: string, hasError = false) => {
  const loginUrl = new URL('/studio/login', request.url);
  loginUrl.searchParams.set('next', nextPath);
  if (hasError) loginUrl.searchParams.set('error', '1');
  return NextResponse.redirect(loginUrl);
};

export async function POST(request: Request) {
  if (!isStudioEnabled) {
    return NextResponse.json({ ok: false, message: 'Studio is disabled.' }, { status: 404 });
  }

  const configuredCredentials = getStudioCredentials();
  if (!configuredCredentials) {
    return NextResponse.json(
      { ok: false, message: 'Studio auth environment variables are missing.' },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const username = typeof formData.get('username') === 'string' ? String(formData.get('username')).trim() : '';
  const password = typeof formData.get('password') === 'string' ? String(formData.get('password')) : '';
  const nextPath = sanitizeStudioNextPath(
    typeof formData.get('next') === 'string' ? String(formData.get('next')) : null,
  );

  if (
    username !== configuredCredentials.username ||
    password !== configuredCredentials.password
  ) {
    return buildLoginRedirect(request, nextPath, true);
  }

  const token = getStudioExpectedToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, message: 'Studio token could not be generated.' },
      { status: 500 },
    );
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set({
    name: STUDIO_AUTH_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
