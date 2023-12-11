'use client';

import { EditorPage } from '@/components/editor/editor-page';

export default function FreeEditor() {
  return (
    <main className='m-0 p-0 max-w-full h-[calc(100vh-theme(spacing.20))]'>
      <EditorPage />
    </main>
  );
}
