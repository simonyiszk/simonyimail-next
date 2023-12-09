'use client';

import { EditorPage } from '@/components/editor-page';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className='h-screen w-full grid grid-rows-[auto_1fr]'>
      <Header />
      <EditorPage />
    </main>
  );
}
