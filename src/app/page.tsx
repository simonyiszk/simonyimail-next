'use client';

import { Navbar } from '@/components/navbar';
import { SheetSelector } from '@/components/sheet-selector/sheet-selector';

export default function MainPage() {
  return (
    <main>
      <Navbar />
      <SheetSelector />
    </main>
  );
}
