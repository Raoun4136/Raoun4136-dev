import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getDb } from '@/db/client';
import { contents } from '@/db/schema';
import MdxEditor from '@/components/studio/mdx-editor';
import StudioSubmitButtons from '@/components/studio/studio-submit-buttons';
import StudioUnsavedGuard from '@/components/studio/studio-unsaved-guard';
import StudioKindFilter from '@/components/studio/studio-kind-filter';
import { saveStudioContent } from '@/app/studio/actions';

export type StudioContentType = 'post' | 'note';

export type StudioPageSearchParams = {
  id?: string;
  q?: string;
  kind?: 'all' | 'post' | 'note';
};

type StudioPageContentProps = {
  searchParams: StudioPageSearchParams;
  createType?: StudioContentType;
};

const toDateTimeLocalValue = (date: Date) => {
  const pad = (num: number) => String(num).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const dateTimeFormatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const toStudioEditHref = (id: number, q: string, kind: 'all' | 'post' | 'note') => {
  const params = new URLSearchParams();
  params.set('id', String(id));
  if (q) params.set('q', q);
  if (kind !== 'all') params.set('kind', kind);
  return `/studio?${params.toString()}`;
};

export default async function StudioPageContent({
  searchParams,
  createType,
}: StudioPageContentProps) {
  const db = getDb();
  if (!db) {
    return (
      <section className="mx-auto max-w-[860px] py-6">
        <h1 className="text-lg font-semibold">Studio</h1>
        <p className="mt-3 text-sm opacity-80">`DATABASE_URL`이 설정되지 않아 Studio를 열 수 없습니다.</p>
      </section>
    );
  }

  const requestedId = Number(searchParams.id);
  const shouldCreateNew = Boolean(createType);
  const filterKeyword = (searchParams.q ?? '').trim().toLowerCase();
  const kindFilter = searchParams.kind === 'post' || searchParams.kind === 'note' ? searchParams.kind : 'all';

  const list = await db
    .select({
      id: contents.id,
      type: contents.type,
      slug: contents.slug,
      title: contents.title,
      draft: contents.draft,
      updatedAt: contents.updatedAt,
      viewCount: contents.viewCount,
      readTimeMin: contents.readTimeMin,
    })
    .from(contents)
    .orderBy(desc(contents.updatedAt));

  const filteredList = list.filter((item) => {
    const typeMatched = kindFilter === 'all' ? true : item.type === kindFilter;
    const keywordMatched =
      filterKeyword.length === 0
        ? true
        : `${item.title} ${item.slug}`.toLowerCase().includes(filterKeyword);

    return typeMatched && keywordMatched;
  });

  let selected = undefined as (typeof contents.$inferSelect) | undefined;

  if (!shouldCreateNew && Number.isFinite(requestedId) && requestedId > 0) {
    const [row] = await db.select().from(contents).where(eq(contents.id, requestedId)).limit(1);
    selected = row;
  } else if (!shouldCreateNew && filteredList.length > 0) {
    const [row] = await db.select().from(contents).where(eq(contents.id, filteredList[0].id)).limit(1);
    selected = row;
  }

  const now = new Date();
  const initialType = selected?.type ?? createType ?? 'post';
  const initialSlug = selected?.slug ?? '';
  const initialTitle = selected?.title ?? '';
  const initialDescription = selected?.description ?? '';
  const initialOutlink = selected?.outlink ?? '';
  const initialShowFull = selected?.showFull ?? false;
  const initialDraft = selected?.draft ?? true;
  const initialPublishedAt = selected?.publishedAt ?? now;
  const initialBodyMdx = selected?.bodyMdx ?? '';
  const statReadTime = selected?.readTimeMin ?? null;
  const statWordCount = selected?.wordCount ?? null;
  const statViewCount = selected?.viewCount ?? 0;
  const selectedPublicPath = selected
    ? selected.type === 'post'
      ? `/posts/${selected.slug}`
      : `/notes/${selected.slug}`
    : null;
  const selectedIsPublished = selected ? !selected.draft : false;
  const formId = selected ? `studio-form-${selected.id}` : `studio-form-new-${initialType}`;
  const editorLabel = selected?.title
    ? selected.title
    : shouldCreateNew
      ? initialType === 'post'
        ? '새 포스트'
        : '새 노트'
      : '새 콘텐츠';

  return (
    <section className="mx-auto w-full max-w-[1540px] py-2 md:py-4">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/15 px-4 py-3">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold tracking-tight">Studio</h1>
          <p className="text-xs text-foreground/72">콘텐츠 작성, 수정, 발행을 한 화면에서 처리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button type="button" variant="outline" className="min-w-24">
              홈으로 이동
            </Button>
          </Link>
          <Link href="/studio/new/post">
            <Button type="button" variant={createType === 'post' ? 'default' : 'outline'} className="min-w-24">
              새 포스트
            </Button>
          </Link>
          <Link href="/studio/new/note">
            <Button type="button" variant={createType === 'note' ? 'default' : 'outline'} className="min-w-24">
              새 노트
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid items-stretch gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col rounded-xl border border-border/70 bg-secondary/10 p-3">
          <form method="get" className="mb-3 grid grid-cols-[1fr_auto] gap-2">
            {!shouldCreateNew && selected?.id && <input type="hidden" name="id" value={selected.id} />}
            <Input
              name="q"
              defaultValue={searchParams.q ?? ''}
              placeholder="제목 또는 slug 검색…"
              autoComplete="off"
            />
            <Button type="submit" variant="outline">
              검색
            </Button>
            <StudioKindFilter defaultValue={kindFilter} />
          </form>

          <p className="px-1 pb-2 text-xs text-foreground/70">
            총 {filteredList.length}개 {filterKeyword ? `(검색: "${searchParams.q}")` : ''}
          </p>

          <div className="min-h-0 flex-1 overflow-auto pr-1">
            {filteredList.length === 0 ? (
              <p className="px-3 py-2 text-sm opacity-70">조건에 맞는 글이 없습니다.</p>
            ) : (
              <ul className="space-y-1">
                {filteredList.map((item) => {
                  const selectedState = selected?.id === item.id;

                  return (
                    <li key={item.id}>
                      <Link
                        href={toStudioEditHref(item.id, searchParams.q ?? '', kindFilter)}
                        className={[
                          'block rounded-md px-3 py-2 text-sm transition-colors',
                          selectedState
                            ? 'border border-border/75 bg-background shadow-sm'
                            : 'border border-transparent hover:bg-secondary/70',
                        ].join(' ')}
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <p className="truncate font-medium">{item.title}</p>
                          <Badge variant={item.draft ? 'secondary' : 'default'}>
                            {item.draft ? 'Draft' : 'Published'}
                          </Badge>
                        </div>
                        <p className="truncate text-xs opacity-70">{item.type + '/' + item.slug}</p>
                        <p className="mt-0.5 text-[11px] opacity-65">
                          {dateTimeFormatter.format(new Date(item.updatedAt))} · 조회 {item.viewCount ?? 0} ·{' '}
                          {item.readTimeMin ? `${item.readTimeMin}분` : '-'}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        <article className="rounded-xl border border-border/70 p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 bg-secondary/15 px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{editorLabel}</p>
              <p className="truncate text-xs opacity-70">
                {selected
                  ? `${selected.type}/${selected.slug}`
                  : `새 ${initialType} 작성 중 · 저장 후 URL이 생성됩니다.`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selected && (
                <Badge variant={selected.draft ? 'secondary' : 'default'}>
                  {selected.draft ? 'Draft' : 'Published'}
                </Badge>
              )}
              {selectedPublicPath && selectedIsPublished && (
                <Link href={selectedPublicPath} target="_blank" rel="noopener noreferrer">
                  <Button type="button" variant="outline">
                    발행 페이지 열기
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <form id={formId} action={saveStudioContent} className="space-y-4">
            {selected?.id && <input type="hidden" name="id" value={selected.id} />}

            <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
              <section className="space-y-4 rounded-lg border border-border/70 bg-secondary/10 p-4">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                  <div className="space-y-1">
                    <label htmlFor="studio-type" className="text-xs font-medium">
                      Type
                    </label>
                    <select
                      id="studio-type"
                      name="type"
                      defaultValue={initialType}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="post">post</option>
                      <option value="note">note</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="studio-slug" className="text-xs font-medium">
                      Slug
                    </label>
                    <Input
                      id="studio-slug"
                      name="slug"
                      defaultValue={initialSlug}
                      placeholder="my-new-post…"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="studio-title" className="text-xs font-medium">
                    Title
                  </label>
                  <Input
                    id="studio-title"
                    name="title"
                    defaultValue={initialTitle}
                    placeholder="제목을 입력해 주세요…"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="studio-description" className="text-xs font-medium">
                    Description
                  </label>
                  <Textarea
                    id="studio-description"
                    name="description"
                    defaultValue={initialDescription}
                    rows={3}
                    placeholder="콘텐츠 설명을 입력해 주세요…"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="studio-outlink" className="text-xs font-medium">
                    Outlink (Optional)
                  </label>
                  <Input
                    id="studio-outlink"
                    name="outlink"
                    type="url"
                    defaultValue={initialOutlink}
                    placeholder="https://example.com/…"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="studio-published-at" className="text-xs font-medium">
                    Published At
                  </label>
                  <Input
                    id="studio-published-at"
                    type="datetime-local"
                    name="publishedAt"
                    defaultValue={toDateTimeLocalValue(new Date(initialPublishedAt))}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2 rounded-md border border-border/70 bg-background px-3 py-2 text-xs">
                  <label htmlFor="studio-draft" className="flex cursor-pointer items-center justify-between">
                    <span className="font-medium">Draft 상태 유지</span>
                    <input id="studio-draft" type="checkbox" name="draft" defaultChecked={initialDraft} />
                  </label>
                  <label htmlFor="studio-show-full" className="flex cursor-pointer items-center justify-between">
                    <span className="font-medium">showFull (post 전용)</span>
                    <input id="studio-show-full" type="checkbox" name="showFull" defaultChecked={initialShowFull} />
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">읽기시간 {statReadTime ?? '-'}분</Badge>
                  <Badge variant="outline">단어수 {statWordCount ?? '-'}</Badge>
                  <Badge variant="outline">조회수 {statViewCount}</Badge>
                </div>
              </section>

              <section className="space-y-2 rounded-lg border border-border/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Body (MDX)</span>
                  <span className="text-xs text-foreground/65">코드블록/표/이미지 문법을 그대로 지원합니다.</span>
                </div>
                <MdxEditor name="bodyMdx" initialValue={initialBodyMdx} minHeight="68vh" formId={formId} />
              </section>
            </div>

            <div className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-background px-3 py-3">
              <StudioUnsavedGuard formId={formId} />
              <StudioSubmitButtons formId={formId} />
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}
