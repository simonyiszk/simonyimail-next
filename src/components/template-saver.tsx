import { TbCloudCheck, TbCloudX } from 'react-icons/tb';

import { Loading } from '@/components/loading';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { useSaveTemplate } from '@/hooks/use-save-template';

interface TemplateSaverProps {
  templateId: string;
  mjml: string;
}

export function TemplateSaver({ templateId, mjml }: TemplateSaverProps) {
  const { data, error, trigger, isMutating } = useSaveTemplate(templateId);
  useDebouncedCallback(mjml, 2000, (mjml) => trigger({ mjml }));
  let child = null;
  if (isMutating) {
    child = <Loading className='text-4xl' />;
  } else if (error) {
    child = <TbCloudX className='text-red-500' />;
  } else {
    child = <TbCloudCheck className='text-green-500' />;
  }
  return (
    <div className='bg-white flex items-center justify-center w-20 h-20 shadow-md rounded-md text-4xl absolute bottom-10 right-10'>
      {child}
    </div>
  );
}