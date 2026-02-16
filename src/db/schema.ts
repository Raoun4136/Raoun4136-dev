import {
  bigint,
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const contentTypeEnum = pgEnum('content_type', ['post', 'note']);

export const contents = pgTable(
  'contents',
  {
    id: serial('id').primaryKey(),
    type: contentTypeEnum('type').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    bodyMdx: text('body_mdx').notNull(),
    draft: boolean('draft').notNull().default(false),
    outlink: text('outlink'),
    showFull: boolean('show_full').notNull().default(false),
    publishedAt: timestamp('published_at', { withTimezone: true, mode: 'date' }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    viewCount: bigint('view_count', { mode: 'number' }).notNull().default(0),
    readTimeMin: integer('read_time_min'),
    wordCount: integer('word_count'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('contents_type_slug_unique').on(table.type, table.slug),
    index('contents_type_published_at_idx').on(table.type, table.publishedAt),
    index('contents_view_count_idx').on(table.viewCount),
  ],
);

export const contentViewEvents = pgTable(
  'content_view_events',
  {
    id: serial('id').primaryKey(),
    contentId: integer('content_id')
      .notNull()
      .references(() => contents.id, { onDelete: 'cascade' }),
    visitorKey: text('visitor_key').notNull(),
    viewedDate: date('viewed_date', { mode: 'string' })
      .notNull()
      .default(sql`CURRENT_DATE`),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('content_view_events_unique_daily_view').on(
      table.contentId,
      table.visitorKey,
      table.viewedDate,
    ),
    index('content_view_events_content_id_idx').on(table.contentId),
  ],
);
