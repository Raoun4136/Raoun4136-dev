import '@/styles/mdx.css';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

type StudioNewPageProps = {
  params: Promise<{
    type?: string;
  }>;
  searchParams: Promise<StudioPageSearchParams>;
};

const toCreateType = (value: string | undefined): StudioContentType | null =>
  value === 'note' ? 'note' : value === 'post' ? 'post' : null;

export default async function StudioNewPage(props: StudioNewPageProps) {
  if (!isStudioEnabled) notFound();

  const params = await props.params;
  const createType = toCreateType(params.type);
  if (!createType) notFound();

  const searchParams = await props.searchParams;

  return (
    <StudioPageContent
      createType={createType}
      searchParams={{
        id: searchParams.id,
        q: searchParams.q,
        kind: searchParams.kind,
      }}
    />
  );
}
