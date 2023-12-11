'use client';

import { Loading } from '@/components/common/loading';
import { EditorPage } from '@/components/editor/editor-page';
import { useTemplate } from '@/hooks/use-template';

export default function Home({ params }: { params: { id: string } }) {
  const { isLoading, data, error } = useTemplate(params.id);
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!data) return <main>Sablon nem található</main>;
  if (!data || error) return <div>{error.message ?? ''}</div>;
  return (
    <main className='m-0 p-0 max-w-full h-[calc(100vh-theme(spacing.20))]'>
      <EditorPage template={data} />
    </main>
  );
}
