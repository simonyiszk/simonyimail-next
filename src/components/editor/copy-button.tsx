import clsx from 'clsx';
import mjml2html from 'mjml-browser';
import { useMemo, useState } from 'react';
import { TbCheck, TbCopy } from 'react-icons/tb';

import { Button } from '@/components/common/button';

interface CopyButtonProps {
  mjml: string;
}

export function CopyButton({ mjml }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const html = useMemo(() => {
    try {
      return mjml2html(mjml).html;
    } catch (e) {
      return String(e);
    }
  }, [mjml]);
  const onCopy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };
  return (
    <Button
      onClick={onCopy}
      className={clsx('bg-white flex items-center justify-center w-20 h-20 shadow-md rounded-md text-4xl', {
        'text-green-500': isCopied,
      })}
    >
      {isCopied ? <TbCheck /> : <TbCopy />}
    </Button>
  );
}
