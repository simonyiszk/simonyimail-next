import { TbCircleCheck, TbCircleX } from 'react-icons/tb';

import { Chip } from '@/components/chip';
import { Loading } from '@/components/loading';
import { useSpreadsheetValues } from '@/hooks/use-spreadsheet-values';

interface SheetHeadersProps {
  sheetId: string;
}

export function SheetHeaders({ sheetId }: SheetHeadersProps) {
  const { data, error } = useSpreadsheetValues(sheetId);
  if (error)
    return (
      <div className='flex gap-3 items-center'>
        <span className='text-red-500 text-xl'>
          <TbCircleX />
        </span>
        <p>{error.message ?? 'Hiba történt'}</p>
      </div>
    );
  if (!data) return <Loading />;
  return (
    <div className='flex gap-3'>
      <span className='text-green-500 text-xl'>
        <TbCircleCheck />
      </span>
      <div className='flex gap-1 flex-wrap'>
        {data.values[0].map((header: string) => (
          <Chip key={header}>{header}</Chip>
        ))}
      </div>
    </div>
  );
}
