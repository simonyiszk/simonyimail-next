'use client';

import { Header } from '@/components/header';
import { SheetSelector } from '@/components/sheet-selector/sheet-selector';

export default function MainPage() {
  return (
    <main>
      <Header />
      <SheetSelector />
    </main>
  );
}
