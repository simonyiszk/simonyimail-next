import { ReactNode, useEffect } from 'react';

import { Loading } from '@/components/common/loading';
import { useSendEmail } from '@/hooks/use-send-email';

interface SingleEmailSendProps {
  to: string;
  from: string;
  html: Promise<string>;
  subject: string;
}

export function SingleEmailSend({ to, from, html, subject }: SingleEmailSendProps) {
  const { isMutating, data, error, trigger, reset } = useSendEmail();

  useEffect(() => {
    reset();
  }, [to, from, subject]);

  const handleClick = async () => {
    void trigger({ to, from, html: await html, subject });
  };

  let children: ReactNode = 'Levél küldése';
  if (isMutating) {
    children = <Loading />;
  } else if (data) {
    children = 'Elküldve';
  } else if (error) {
    children = 'Sikertelen';
  }
  return (
    <div className='flex flex-col items-end gap-1'>
      <button disabled={isMutating || typeof data !== 'undefined'} className='primary' onClick={handleClick}>
        {children}
      </button>
      {error && (
        <p className='text-red-500 text-xs text-right max-w-xs'>{error.response?.data?.error || error.message}</p>
      )}
    </div>
  );
}
