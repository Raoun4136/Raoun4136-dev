import { and, eq, sql } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { contentViewEvents, contents } from '@/db/schema';

type ContentType = 'post' | 'note';

type TrackContentViewParams = {
  type: ContentType;
  slug: string;
  visitorKey: string;
  viewedDate: string;
};

export const trackContentView = async ({
  type,
  slug,
  visitorKey,
  viewedDate,
}: TrackContentViewParams) => {
  const db = getDb();
  if (!db) return { tracked: false as const, reason: 'db-disabled' as const };

  const [content] = await db
    .select({ id: contents.id })
    .from(contents)
    .where(and(eq(contents.type, type), eq(contents.slug, slug), eq(contents.draft, false)))
    .limit(1);

  if (!content) return { tracked: false as const, reason: 'not-found' as const };

  const inserted = await db
    .insert(contentViewEvents)
    .values({
      contentId: content.id,
      visitorKey,
      viewedDate,
    })
    .onConflictDoNothing()
    .returning({ id: contentViewEvents.id });

  if (inserted.length === 0) {
    return { tracked: false as const, reason: 'already-tracked' as const };
  }

  await db
    .update(contents)
    .set({
      viewCount: sql`${contents.viewCount} + 1`,
    })
    .where(eq(contents.id, content.id));

  return { tracked: true as const };
};
