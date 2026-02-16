import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { trackContentView } from '@/db/queries/views';
import { isVercelProduction } from '@/lib/runtime-env';

type RouteContext = {
  params: Promise<{
    type: string;
    slug: string;
  }>;
};

const isSupportedContentType = (type: string): type is 'post' | 'note' => {
  return type === 'post' || type === 'note';
};

const extractClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) return 'unknown';
  return forwardedFor.split(',')[0]?.trim() || 'unknown';
};

const buildVisitorKey = (request: Request) => {
  const ip = extractClientIp(request);
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const acceptLanguage = request.headers.get('accept-language') ?? 'unknown';
  const rawIdentity = `${ip}|${userAgent}|${acceptLanguage}`;

  return createHash('sha256').update(rawIdentity).digest('hex');
};

export async function POST(request: Request, context: RouteContext) {
  if (!isVercelProduction) {
    return NextResponse.json({ ok: true, tracked: false, reason: 'non-production' });
  }

  const params = await context.params;
  if (!isSupportedContentType(params.type)) {
    return NextResponse.json({ ok: false, message: 'Unsupported content type' }, { status: 400 });
  }

  const visitorKey = buildVisitorKey(request);
  const viewedDate = new Date().toISOString().slice(0, 10);

  const result = await trackContentView({
    type: params.type,
    slug: params.slug,
    visitorKey,
    viewedDate,
  });

  if (result.reason === 'not-found') {
    return NextResponse.json({ ok: false, message: 'Content not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, tracked: result.tracked });
}
