import { NextResponse } from 'next/server';
import { sanitizeStudioNextPath, STUDIO_AUTH_COOKIE } from '@/lib/studio-auth';

export async function POST(request: Request) {
  const formData = await request.formData();
  const nextPath = sanitizeStudioNextPath(
    typeof formData.get('next') === 'string' ? String(formData.get('next')) : null,
    '/',
  );

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set({
    name: STUDIO_AUTH_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
