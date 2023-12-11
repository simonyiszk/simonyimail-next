'use client';

import mjml2html from 'mjml-browser';
import React, { useMemo } from 'react';

interface EmailRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  mjml: string;
}

export function EmailRenderer({ mjml, ...props }: EmailRendererProps) {
  const html = useMemo(() => {
    try {
      return mjml2html(mjml).html;
    } catch (e) {
      return String(e);
    }
  }, [mjml]);
  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
