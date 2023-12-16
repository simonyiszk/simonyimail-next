'use client';

import React, { useMemo } from 'react';

import { getHtmlForMjml } from '@/utils/convert-mjml';

interface EmailRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  mjml: string;
}

export function EmailRenderer({ mjml, ...props }: EmailRendererProps) {
  const html = useMemo(() => {
    return getHtmlForMjml(mjml);
  }, [mjml]);
  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
