'use client';

import React, { useEffect, useState } from 'react';

import { getHtmlForMjml } from '@/utils/convert-mjml';

interface EmailRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  mjml: string;
}

export function EmailRenderer({ mjml, ...props }: EmailRendererProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let disposed = false;

    getHtmlForMjml(mjml).then((html) => {
      if (!disposed) {
        setHtml(html);
      }
    });

    return (): void => {
      disposed = true;
    };
  }, [mjml]);

  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
