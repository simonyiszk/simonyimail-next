import { ReactNode, useEffect } from 'react';

import { Loading } from '@/components/common/loading';
import { useSendEmail } from '@/hooks/use-send-email';

interface SingleEmailSendProps {
  to: string;
  html: string;
}

export function SingleEmailSend({ to, html }: SingleEmailSendProps) {
  const { isMutating, data, error, trigger, reset } = useSendEmail();

  useEffect(() => {
    reset();
  }, [to]);

  const handleClick = () => {
    trigger({ to, html });
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
    <button disabled={isMutating || typeof data !== 'undefined'} className='primary' onClick={handleClick}>
      {children}
    </button>
  );
}
