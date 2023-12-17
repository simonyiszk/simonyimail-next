import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { EmailFieldSelector } from '@/components/flow/target-selector/sheet-selector/email-field-selector';
import { SheetPreview } from '@/components/flow/target-selector/sheet-selector/sheet-preview';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';
import { TargetWithEmail } from '@/types/target.type';
import { convertSpreadsheetToObject } from '@/utils/sheet-to-object';

interface SheetSelectorProps {
  onTargetsSelected: (targets: TargetWithEmail[]) => void;
}

export function SheetSelector({ onTargetsSelected }: SheetSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sheetId, setSheetId] = useState<string>();
  const [sheetValues, setSheetValues] = useState<SpreadsheetValues>();
  const [emailField, setEmailField] = useState<string>();

  const onSearch = () => {
    setSheetId(inputRef.current?.value);
  };

  const onFinished = useCallback(() => {
    if (!sheetValues || !emailField) return;
    const targets = convertSpreadsheetToObject(sheetValues.values);
    const targetsWithEmail = targets.map((target) => ({ ...target, email: target[emailField] }));
    onTargetsSelected(targetsWithEmail);
  }, [sheetValues, emailField, onTargetsSelected]);

  useEffect(() => {
    onFinished();
  }, [onFinished]);

  return (
    <Card>
      <h2>Táblázat kiválasztása</h2>
      <div className='flex gap-3'>
        <input className='flex-1' ref={inputRef} placeholder='Azonosító' />
        <Button onClick={onSearch} variant='primary'>
          Keresés
        </Button>
      </div>
      {sheetId && <SheetPreview sheetId={sheetId} onSheetValuesSelected={setSheetValues} />}
      {sheetValues && <EmailFieldSelector headers={sheetValues.values[0]} onSelectedEmailField={setEmailField} />}
    </Card>
  );
}
