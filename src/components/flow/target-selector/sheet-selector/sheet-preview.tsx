import { Loading } from '@/components/common/loading';
import { ErrorDisplay } from '@/components/common/status-display/error-display';
import { SuccessDisplay } from '@/components/common/status-display/success-display';
import { SheetHeaders } from '@/components/flow/target-selector/sheet-selector/sheet-headers';
import { useSpreadsheet } from '@/hooks/use-spreadsheet';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

interface SheetPreviewProps {
  sheetId: string;
  onSheetValuesSelected: (sheetValues: SpreadsheetValues) => void;
}

export function SheetPreview({ sheetId, onSheetValuesSelected }: SheetPreviewProps) {
  const { data, error, isLoading } = useSpreadsheet(sheetId);
  if (isLoading) return <Loading />;
  if (!data || error) return <ErrorDisplay text={error.message ?? 'Hiba történt'} />;
  return (
    <>
      <SuccessDisplay text={data.properties.title} />
      <SheetHeaders sheetId={sheetId} onSheetValuesSelected={onSheetValuesSelected} />
    </>
  );
}
