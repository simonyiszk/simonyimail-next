'use client';

import EditorPage from '@/components/editor/editor-page';

export default function FreeEditor() {
  return (
    <div className='m-0 p-0 max-w-full h-[calc(100vh-(--spacing(20)))]'>
      <EditorPage />
    </div>
  );
}
