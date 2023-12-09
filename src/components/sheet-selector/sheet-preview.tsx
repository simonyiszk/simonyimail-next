import { ErrorDisplay } from '@/components/error-display';
import { Loading } from '@/components/loading';
import { SheetHeaders } from '@/components/sheet-selector/sheet-headers';
import { SuccessDisplay } from '@/components/success-display';
import { useSpreadsheet } from '@/hooks/use-spreadsheet';

interface SheetPreviewProps {
  sheetId: string;
}

export function SheetPreview({ sheetId }: SheetPreviewProps) {
  const { data, error, isLoading } = useSpreadsheet(sheetId);
  if (isLoading) return <Loading />;
  if (!data || error) return <ErrorDisplay text={error.message ?? 'Hiba történt'} />;
  return (
    <>
      <SuccessDisplay text={data.properties.title} />
      <SheetHeaders sheetId={sheetId} />
    </>
  );
}
