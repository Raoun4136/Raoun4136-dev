import { and, desc, eq } from 'drizzle-orm';
import { cache } from 'react';

import { PostType, NoteType } from '@/components/lib/type';
import { getDb } from '@/db/client';
import { contents } from '@/db/schema';

export type ContentType = 'post' | 'note';

export type PostEntry = {
  id: number | null;
  slug: string;
  content: string;
  meta: PostType;
};

export type NoteEntry = {
  id: number | null;
  slug: string;
  content: string;
  meta: NoteType;
};

const mapDbPost = (row: typeof contents.$inferSelect): PostEntry => ({
  id: row.id,
  slug: row.slug,
  content: row.bodyMdx,
  meta: {
    title: row.title,
    description: row.description ?? '',
    date: row.publishedAt.toISOString(),
    update: row.updatedAt.toISOString(),
    draft: row.draft,
    outlink: row.outlink ?? undefined,
    showFull: row.showFull,
    viewCount: row.viewCount ?? 0,
    readTimeMin: row.readTimeMin ?? undefined,
    wordCount: row.wordCount ?? undefined,
  },
});

const mapDbNote = (row: typeof contents.$inferSelect): NoteEntry => ({
  id: row.id,
  slug: row.slug,
  content: row.bodyMdx,
  meta: {
    title: row.title,
    description: row.description ?? '',
    date: row.publishedAt.toISOString(),
    update: row.updatedAt.toISOString(),
    draft: row.draft,
    viewCount: row.viewCount ?? 0,
    readTimeMin: row.readTimeMin ?? undefined,
    wordCount: row.wordCount ?? undefined,
  },
});

const loadEntriesFromDb = async (type: ContentType): Promise<PostEntry[] | NoteEntry[]> => {
  const db = getDb();
  if (!db) return [];

  const rows = await db
    .select()
    .from(contents)
    .where(and(eq(contents.type, type), eq(contents.draft, false)))
    .orderBy(desc(contents.publishedAt));

  if (type === 'post') {
    return rows.map(mapDbPost);
  }

  return rows.map(mapDbNote);
};

const loadPostEntries = async (): Promise<PostEntry[]> => {
  return (await loadEntriesFromDb('post')) as PostEntry[];
};

const loadNoteEntries = async (): Promise<NoteEntry[]> => {
  return (await loadEntriesFromDb('note')) as NoteEntry[];
};

export const getPostEntries = cache(async () => loadPostEntries());
export const getNoteEntries = cache(async () => loadNoteEntries());

export const getPostBySlug = cache(async (slug: string): Promise<PostEntry | null> => {
  const posts = await getPostEntries();
  return posts.find((post) => post.slug === slug) ?? null;
});

export const getNoteBySlug = cache(async (slug: string): Promise<NoteEntry | null> => {
  const notes = await getNoteEntries();
  return notes.find((note) => note.slug === slug) ?? null;
});

export const getAllPublishedEntries = cache(async () => {
  const [posts, notes] = await Promise.all([getPostEntries(), getNoteEntries()]);
  return { posts, notes };
});
