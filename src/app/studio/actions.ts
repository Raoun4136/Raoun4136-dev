'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import readingTime from 'reading-time';

import { getDb } from '@/db/client';
import { contents } from '@/db/schema';
import { isStudioEnabled } from '@/lib/studio-auth';
import { isStudioAuthenticated } from '@/lib/studio-auth-server';

const saveContentSchema = z.object({
  id: z.number().int().positive().optional(),
  type: z.enum(['post', 'note']),
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9][a-z0-9-]*$/i),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  outlink: z.string().trim().url().optional(),
  showFull: z.boolean(),
  draft: z.boolean(),
  publishedAt: z.date(),
  bodyMdx: z.string(),
  submitMode: z.enum(['save', 'publish']).default('save'),
});

const toOptionalString = (value: FormDataEntryValue | null) => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const parseDateFromInput = (value: FormDataEntryValue | null) => {
  if (typeof value !== 'string' || value.trim().length === 0) return new Date();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date();
  return parsed;
};

export async function saveStudioContent(formData: FormData) {
  if (!isStudioEnabled) {
    throw new Error('Studio is disabled in this environment.');
  }

  if (!(await isStudioAuthenticated())) {
    redirect('/studio/login?next=/studio');
  }

  const db = getDb();
  if (!db) {
    throw new Error('DATABASE_URL is not configured.');
  }

  const rawId = formData.get('id');
  const rawSubmitMode = formData.get('submitMode');
  const parsed = saveContentSchema.parse({
    id:
      typeof rawId === 'string' && rawId.trim().length > 0
        ? Number(rawId)
        : undefined,
    type: formData.get('type'),
    slug: formData.get('slug'),
    title: formData.get('title'),
    description: toOptionalString(formData.get('description')),
    outlink: toOptionalString(formData.get('outlink')),
    showFull: formData.get('showFull') === 'on',
    draft: formData.get('draft') === 'on',
    publishedAt: parseDateFromInput(formData.get('publishedAt')),
    bodyMdx: typeof formData.get('bodyMdx') === 'string' ? String(formData.get('bodyMdx')) : '',
    submitMode: typeof rawSubmitMode === 'string' ? rawSubmitMode : 'save',
  });

  const normalizedType = parsed.type;
  const normalizedSlug = parsed.slug.toLowerCase();
  const draft = parsed.submitMode === 'publish' ? false : parsed.draft;
  const outlink = parsed.outlink ?? null;
  const bodyMdx = parsed.bodyMdx;

  const hasOnlyOutlink = Boolean(outlink) && bodyMdx.trim().length === 0;
  const stats = readingTime(bodyMdx);
  const readTimeMin = hasOnlyOutlink ? null : Math.max(1, Math.ceil(stats.minutes || 1));
  const wordCount = hasOnlyOutlink ? null : Math.max(0, stats.words || 0);
  const now = new Date();

  let savedContent:
    | {
        id: number;
        type: 'post' | 'note';
        slug: string;
      }
    | undefined;

  if (parsed.id) {
    const [updated] = await db
      .update(contents)
      .set({
        type: normalizedType,
        slug: normalizedSlug,
        title: parsed.title,
        description: parsed.description ?? null,
        bodyMdx,
        draft,
        outlink,
        showFull: normalizedType === 'post' ? parsed.showFull : false,
        publishedAt: parsed.publishedAt,
        updatedAt: now,
        readTimeMin,
        wordCount,
      })
      .where(eq(contents.id, parsed.id))
      .returning({
        id: contents.id,
        type: contents.type,
        slug: contents.slug,
      });

    savedContent = updated as typeof savedContent;
  } else {
    const [upserted] = await db
      .insert(contents)
      .values({
        type: normalizedType,
        slug: normalizedSlug,
        title: parsed.title,
        description: parsed.description ?? null,
        bodyMdx,
        draft,
        outlink,
        showFull: normalizedType === 'post' ? parsed.showFull : false,
        publishedAt: parsed.publishedAt,
        updatedAt: now,
        readTimeMin,
        wordCount,
      })
      .onConflictDoUpdate({
        target: [contents.type, contents.slug],
        set: {
          title: parsed.title,
          description: parsed.description ?? null,
          bodyMdx,
          draft,
          outlink,
          showFull: normalizedType === 'post' ? parsed.showFull : false,
          publishedAt: parsed.publishedAt,
          updatedAt: now,
          readTimeMin,
          wordCount,
        },
      })
      .returning({
        id: contents.id,
        type: contents.type,
        slug: contents.slug,
      });

    savedContent = upserted as typeof savedContent;
  }

  if (!savedContent) {
    throw new Error('콘텐츠를 저장하지 못했습니다.');
  }

  const contentPath =
    savedContent.type === 'post' ? `/posts/${savedContent.slug}` : `/notes/${savedContent.slug}`;

  revalidatePath('/studio');
  revalidatePath('/');
  revalidatePath('/posts');
  revalidatePath('/notes');
  revalidatePath(contentPath);
  revalidatePath('/sitemap.xml');

  redirect(`/studio?id=${savedContent.id}`);
}
