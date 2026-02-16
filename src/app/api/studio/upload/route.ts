import { put } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';
import { isStudioEnabled, isStudioSessionTokenValid, STUDIO_AUTH_COOKIE } from '@/lib/studio-auth';

const MAX_UPLOAD_SIZE = Math.floor(4.5 * 1024 * 1024);
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

const toSafeFileName = (name: string) => {
  const fallback = 'image';
  const normalized = name.normalize('NFKD').replace(/[^\w.-]/g, '-');
  const compacted = normalized.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return compacted.length > 0 ? compacted : fallback;
};

const buildUploadPath = (originalName: string) => {
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `studio/${y}/${m}/${d}/${toSafeFileName(originalName)}`;
};

export async function POST(request: NextRequest) {
  if (!isStudioEnabled) {
    return NextResponse.json({ ok: false, message: 'Studio is disabled.' }, { status: 404 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, message: 'BLOB_READ_WRITE_TOKEN 환경변수가 필요합니다.' },
      { status: 500 },
    );
  }

  const sessionToken = request.cookies.get(STUDIO_AUTH_COOKIE)?.value;
  if (!isStudioSessionTokenValid(sessionToken)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: '파일이 없습니다.' }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ ok: false, message: '이미지 파일만 업로드할 수 있습니다.' }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      { ok: false, message: '이미지 크기는 4.5MB 이하여야 합니다.' },
      { status: 400 },
    );
  }

  try {
    const uploaded = await put(buildUploadPath(file.name), file, {
      access: 'public',
      addRandomSuffix: true,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      ok: true,
      url: uploaded.url,
      pathname: uploaded.pathname,
      contentType: uploaded.contentType,
      size: file.size,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '이미지를 업로드하지 못했습니다.';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
