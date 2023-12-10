'use client';

import { Template } from '@prisma/client';
import { useState } from 'react';

import { SheetSelector } from '@/components/sheet-selector/sheet-selector';
import { TemplateSelector } from '@/components/template-selector';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

export default function MainPage() {
  const [selectedSheetValues, setSelectedSheetValues] = useState<SpreadsheetValues>();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  return (
    <main>
      <SheetSelector onSheetValuesSelected={setSelectedSheetValues} />
      {selectedSheetValues && (
        <TemplateSelector spreadsheetValues={selectedSheetValues} onSelectedTemplate={setSelectedTemplate} />
      )}
    </main>
  );
}
