import { TbCloudCheck, TbCloudX } from 'react-icons/tb';

import { Loading } from '@/components/common/loading';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { useSaveTemplate } from '@/hooks/use-save-template';

interface TemplateSaverProps {
  templateId: string;
  mjml: string;
}

export function TemplateSaver({ templateId, mjml }: TemplateSaverProps) {
  const { error, trigger, isMutating } = useSaveTemplate(templateId);
  useDebouncedCallback(mjml, 2000, (mjml) => trigger({ mjml }));
  let child;
  if (isMutating) {
    child = <Loading className='text-4xl' />;
  } else if (error) {
    child = <TbCloudX className='text-red-500' />;
  } else {
    child = <TbCloudCheck className='text-green-500' />;
  }
  return (
    <div className='bg-white flex items-center justify-center w-20 h-20 shadow-md rounded-md text-4xl'>{child}</div>
  );
}
