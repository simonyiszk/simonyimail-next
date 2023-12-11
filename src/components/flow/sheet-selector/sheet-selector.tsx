import { useCallback, useRef, useState } from 'react';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { SheetPreview } from '@/components/flow/sheet-selector/sheet-preview';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';
import { Target } from '@/types/target.type';
import { convertSpreadsheetToObject } from '@/utils/sheet-to-object';

interface SheetSelectorProps {
  onSheetValuesSelected: (targets: Target[]) => void;
}

export function SheetSelector({ onSheetValuesSelected }: SheetSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sheetId, setSheetId] = useState<string>();

  const onSearch = () => {
    setSheetId(inputRef.current?.value);
  };

  const handleValuesSelect = useCallback(
    (sheetValues: SpreadsheetValues) => {
      const targets: Target[] = convertSpreadsheetToObject(sheetValues.values);
      onSheetValuesSelected(targets);
    },
    [onSheetValuesSelected]
  );

  return (
    <Card>
      <h2>Táblázat kiválasztása</h2>
      <div className='flex gap-3'>
        <input className='flex-1' ref={inputRef} placeholder='Azonosító' />
        <Button onClick={onSearch} variant='primary'>
          Keresés
        </Button>
      </div>
      {sheetId && <SheetPreview sheetId={sheetId} onSheetValuesSelected={handleValuesSelect} />}
    </Card>
  );
}
