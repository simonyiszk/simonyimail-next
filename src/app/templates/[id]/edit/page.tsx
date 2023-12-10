'use client';

import { EditorPage } from '@/components/editor-page';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className='h-screen w-full grid grid-rows-[auto_1fr]'>
      <Navbar />
      <EditorPage />
    </main>
  );
}
