CREATE TYPE "public"."content_type" AS ENUM('post', 'note');--> statement-breakpoint
CREATE TABLE "content_view_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_id" integer NOT NULL,
	"visitor_key" text NOT NULL,
	"viewed_date" date DEFAULT CURRENT_DATE NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "content_type" NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"body_mdx" text NOT NULL,
	"draft" boolean DEFAULT false NOT NULL,
	"outlink" text,
	"show_full" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"view_count" bigint DEFAULT 0 NOT NULL,
	"read_time_min" integer,
	"word_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_view_events" ADD CONSTRAINT "content_view_events_content_id_contents_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."contents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "content_view_events_unique_daily_view" ON "content_view_events" USING btree ("content_id","visitor_key","viewed_date");--> statement-breakpoint
CREATE INDEX "content_view_events_content_id_idx" ON "content_view_events" USING btree ("content_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contents_type_slug_unique" ON "contents" USING btree ("type","slug");--> statement-breakpoint
CREATE INDEX "contents_type_published_at_idx" ON "contents" USING btree ("type","published_at");--> statement-breakpoint
CREATE INDEX "contents_view_count_idx" ON "contents" USING btree ("view_count");