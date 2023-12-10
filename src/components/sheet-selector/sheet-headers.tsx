import { useEffect } from 'react';

import { Chip } from '@/components/chip';
import { ErrorDisplay } from '@/components/error-display';
import { Loading } from '@/components/loading';
import { SuccessDisplay } from '@/components/success-display';
import { useSpreadsheetValues } from '@/hooks/use-spreadsheet-values';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

interface SheetHeadersProps {
  sheetId: string;
  onSheetValuesSelected: (sheetValues: SpreadsheetValues) => void;
}

export function SheetHeaders({ sheetId, onSheetValuesSelected }: SheetHeadersProps) {
  const { data, isLoading, error } = useSpreadsheetValues(sheetId);
  useEffect(() => {
    if (data) onSheetValuesSelected(data);
  }, [data, onSheetValuesSelected]);

  if (isLoading) return <Loading />;
  if (!data || error) return <ErrorDisplay text={error.message ?? 'Hiba történt'} />;
  return (
    <SuccessDisplay>
      <div className='flex gap-1 flex-wrap'>
        {data.values[0].map((header: string) => (
          <Chip key={header}>{header}</Chip>
        ))}
      </div>
    </SuccessDisplay>
  );
}
