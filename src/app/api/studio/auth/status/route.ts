import { NextResponse, type NextRequest } from 'next/server';
import { isStudioEnabled, isStudioSessionTokenValid, STUDIO_AUTH_COOKIE } from '@/lib/studio-auth';

export async function GET(request: NextRequest) {
  if (!isStudioEnabled) {
    return NextResponse.json(
      { enabled: false, isAuthenticated: false },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const token = request.cookies.get(STUDIO_AUTH_COOKIE)?.value;
  const isAuthenticated = isStudioSessionTokenValid(token);

  return NextResponse.json(
    { enabled: true, isAuthenticated },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
