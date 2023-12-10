import { useRef, useState } from 'react';

import { Card } from '@/components/card';
import { SheetPreview } from '@/components/sheet-selector/sheet-preview';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

interface SheetSelectorProps {
  onSheetValuesSelected: (sheetValues: SpreadsheetValues) => void;
}

export function SheetSelector({ onSheetValuesSelected }: SheetSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sheetId, setSheetId] = useState<string>();

  const onSearch = () => {
    setSheetId(inputRef.current?.value);
  };

  return (
    <Card className='mx-auto w-96 max-w-full my-5'>
      <h2>Táblázat kiválasztása</h2>
      <input ref={inputRef} placeholder='Azonosító' />
      <button onClick={onSearch} className='primary'>
        Keresés
      </button>
      {sheetId && <SheetPreview sheetId={sheetId} onSheetValuesSelected={onSheetValuesSelected} />}
    </Card>
  );
}
