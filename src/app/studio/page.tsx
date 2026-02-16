import '@/styles/mdx.css';

import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { CommonMetaData } from '@/components/lib/constant';
import StudioPageContent, {
  type StudioContentType,
  type StudioPageSearchParams,
} from '@/components/studio/studio-page-content';
import { isStudioEnabled } from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  ...CommonMetaData,
  title: 'Studio',
  description: '콘텐츠 작성/편집 스튜디오',
  robots: {
    index: false,
    follow: false,
  },
};

type StudioPageProps = {
  searchParams: Promise<
    StudioPageSearchParams & {
      new?: string;
      type?: StudioContentType;
    }
  >;
};

const toLegacyCreateType = (value: string | undefined): StudioContentType | null =>
  value === 'note' ? 'note' : value === 'post' ? 'post' : null;

export default async function StudioPage(props: StudioPageProps) {
  if (!isStudioEnabled) notFound();

  const searchParams = await props.searchParams;
  const legacyCreateType = toLegacyCreateType(searchParams.type);
  const shouldRedirectToNew =
    searchParams.new === '1' || legacyCreateType !== null;

  if (shouldRedirectToNew) {
    const createType = legacyCreateType ?? 'post';
    const nextQuery = new URLSearchParams();
    if (searchParams.q) nextQuery.set('q', searchParams.q);
    if (searchParams.kind) nextQuery.set('kind', searchParams.kind);
    const nextSearch = nextQuery.toString();
    redirect(`/studio/new/${createType}${nextSearch ? `?${nextSearch}` : ''}`);
  }

  return (
    <StudioPageContent
      searchParams={{
        id: searchParams.id,
        q: searchParams.q,
        kind: searchParams.kind,
      }}
    />
  );
}
