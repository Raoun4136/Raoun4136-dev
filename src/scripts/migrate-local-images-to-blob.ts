import 'dotenv/config';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { put } from '@vercel/blob';

const ROOT_DIR = process.cwd();
const MDX_DIR = path.join(ROOT_DIR, 'src/mdx');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGE_REF_REGEX = /\/images\/[A-Za-z0-9._/-]+/g;
const CACHE_SECONDS = 60 * 60 * 24 * 30;

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

const toBlobPath = (localRef: string) => `mdx${localRef}`;

const getContentType = (filePath: string) => {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_BY_EXT[ext] ?? 'application/octet-stream';
};

const walk = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      if (entry.isFile() && fullPath.endsWith('.mdx')) {
        return [fullPath];
      }
      return [];
    }),
  );

  return files.flat();
};

const parseImageRefs = (source: string) => {
  const refs = new Set<string>();
  const matches = source.matchAll(IMAGE_REF_REGEX);
  for (const match of matches) {
    const ref = match[0];
    if (ref.startsWith('/images/')) refs.add(ref);
  }
  return [...refs];
};

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  if (!process.env.BLOB_READ_WRITE_TOKEN && !isDryRun) {
    throw new Error('BLOB_READ_WRITE_TOKEN 환경변수가 필요합니다.');
  }

  const mdxFiles = await walk(MDX_DIR);
  const refsByFile = new Map<string, string[]>();
  const allRefs = new Set<string>();

  for (const file of mdxFiles) {
    const source = await fs.readFile(file, 'utf8');
    const refs = parseImageRefs(source);
    if (refs.length > 0) {
      refsByFile.set(file, refs);
      for (const ref of refs) allRefs.add(ref);
    }
  }

  const refs = [...allRefs].sort();
  if (refs.length === 0) {
    console.log('치환할 /images/... 레퍼런스를 찾지 못했습니다.');
    return;
  }

  console.log(`MDX 이미지 레퍼런스 ${refs.length}개를 찾았습니다.`);
  if (isDryRun) {
    refs.forEach((ref) => console.log(`- ${ref}`));
    return;
  }

  const urlMap = new Map<string, string>();
  for (const ref of refs) {
    const localPath = path.join(PUBLIC_DIR, ref.slice(1));

    try {
      await fs.access(localPath);
    } catch {
      throw new Error(`로컬 이미지 파일을 찾지 못했습니다: ${localPath}`);
    }

    const content = await fs.readFile(localPath);
    const uploaded = await put(toBlobPath(ref), content, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: getContentType(localPath),
      cacheControlMaxAge: CACHE_SECONDS,
    });

    urlMap.set(ref, uploaded.url);
    console.log(`업로드 완료: ${ref} -> ${uploaded.url}`);
  }

  const changedFiles: string[] = [];
  for (const [file, refsInFile] of refsByFile.entries()) {
    const source = await fs.readFile(file, 'utf8');
    let next = source;
    for (const ref of refsInFile) {
      const blobUrl = urlMap.get(ref);
      if (!blobUrl) continue;
      next = next.split(ref).join(blobUrl);
    }

    if (next !== source) {
      await fs.writeFile(file, next, 'utf8');
      changedFiles.push(file);
    }
  }

  console.log(`MDX 파일 ${changedFiles.length}개를 Blob URL로 치환했습니다.`);
  changedFiles.forEach((file) => console.log(`- ${path.relative(ROOT_DIR, file)}`));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
