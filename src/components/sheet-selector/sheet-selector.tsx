'use client';
import { useRef, useState } from 'react';

import { SheetPreview } from '@/components/sheet-selector/sheet-preview';

export function SheetSelector() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sheetId, setSheetId] = useState<string>();

  const onSearch = () => {
    setSheetId(inputRef.current?.value);
  };

  return (
    <div className='flex flex-col gap-2 bg-white rounded-md p-5 mx-auto w-80 max-w-full shadow-sm my-5'>
      <h2>Táblázat kiválasztása</h2>
      <input ref={inputRef} placeholder='Azonosító' />
      <button onClick={onSearch} className='primary'>
        Keresés
      </button>
      {sheetId && <SheetPreview sheetId={sheetId} />}
    </div>
  );
}
