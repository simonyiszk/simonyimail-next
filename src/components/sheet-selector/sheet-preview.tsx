import { TbCircleCheck, TbCircleX } from 'react-icons/tb';

import { Loading } from '@/components/loading';
import { useSpreadsheet } from '@/hooks/use-spreadsheet';

interface SheetPreviewProps {
  sheetId: string;
}

export function SheetPreview({ sheetId }: SheetPreviewProps) {
  const { data, error, isLoading } = useSpreadsheet(sheetId);
  if (isLoading) return <Loading />;
  if (!data || error)
    return (
      <div className='flex gap-3 items-center'>
        <span className='text-red-500 text-xl'>
          <TbCircleX />
        </span>
        <p>{error.message ?? 'Hiba történt'}</p>
      </div>
    );
  return (
    <div className='flex gap-3 items-center'>
      <span className='text-green-500 text-xl'>
        <TbCircleCheck />
      </span>
      <p className='truncate'>{data.properties.title}</p>
    </div>
  );
}
