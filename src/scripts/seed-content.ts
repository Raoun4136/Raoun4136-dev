import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { getDb } from '../db/client';
import { contents } from '../db/schema';

type ContentType = 'post' | 'note';

type MdxEntry = {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  bodyMdx: string;
  draft: boolean;
  outlink?: string;
  showFull: boolean;
  publishedAt: Date;
  updatedAt: Date;
  readTimeMin: number | null;
  wordCount: number | null;
};

const CONTENT_DIR: Record<ContentType, string> = {
  post: 'src/mdx/posts',
  note: 'src/mdx/notes',
};

const toDate = (value: unknown, fallback: Date) => {
  if (value instanceof Date) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return fallback;
};

const toOptionalString = (value: unknown): string | undefined => {
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return undefined;
};

const buildEntry = (type: ContentType, filename: string): MdxEntry => {
  const fullPath = path.join(CONTENT_DIR[type], filename);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { data: frontMatter, content } = matter(source);
  const fallbackDate = new Date();
  const publishedAt = toDate(frontMatter.date, fallbackDate);
  const updatedAt = toDate(frontMatter.update, publishedAt);
  const outlink = toOptionalString(frontMatter.outlink);
  const hasOnlyOutlink = Boolean(outlink) && content.trim().length === 0;
  const stats = readingTime(content);
  const readTimeMin = hasOnlyOutlink ? null : Math.max(1, Math.ceil(stats.minutes || 1));
  const wordCount = hasOnlyOutlink ? null : Math.max(0, stats.words || 0);

  return {
    type,
    slug: filename.replace('.mdx', ''),
    title: String(frontMatter.title ?? filename.replace('.mdx', '')),
    description: String(frontMatter.description ?? ''),
    bodyMdx: content,
    draft: Boolean(frontMatter.draft ?? false),
    outlink,
    showFull: Boolean(frontMatter.showFull ?? false),
    publishedAt,
    updatedAt,
    readTimeMin,
    wordCount,
  };
};

const readEntries = (type: ContentType) => {
  const files = fs.readdirSync(CONTENT_DIR[type]);
  return files.filter((filename) => filename.endsWith('.mdx')).map((filename) => buildEntry(type, filename));
};

async function main() {
  const db = getDb();
  if (!db) {
    throw new Error('DATABASE_URL is not set. Please configure DATABASE_URL before seeding.');
  }

  const entries = [...readEntries('post'), ...readEntries('note')];

  console.log(`Seeding ${entries.length} entries...`);

  for (const entry of entries) {
    await db
      .insert(contents)
      .values({
        type: entry.type,
        slug: entry.slug,
        title: entry.title,
        description: entry.description,
        bodyMdx: entry.bodyMdx,
        draft: entry.draft,
        outlink: entry.outlink,
        showFull: entry.showFull,
        publishedAt: entry.publishedAt,
        updatedAt: entry.updatedAt,
        readTimeMin: entry.readTimeMin,
        wordCount: entry.wordCount,
      })
      .onConflictDoUpdate({
        target: [contents.type, contents.slug],
        set: {
          title: entry.title,
          description: entry.description,
          bodyMdx: entry.bodyMdx,
          draft: entry.draft,
          outlink: entry.outlink,
          showFull: entry.showFull,
          publishedAt: entry.publishedAt,
          updatedAt: entry.updatedAt,
          readTimeMin: entry.readTimeMin,
          wordCount: entry.wordCount,
        },
      });
  }

  console.log('Seed completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
