import { Template } from '@prisma/client';
import { useMemo, useState } from 'react';

import { EmailRenderer } from '@/components/email-renderer';
import { FormattedEditor } from '@/components/formatted-editor';
import { ParamEditor } from '@/components/param-editor';
import { HorizontalSplitPane } from '@/components/split-pane/horizontal-split-pane';
import { VerticalSplitPane } from '@/components/split-pane/vertical-split-pane';
import { TemplateSaver } from '@/components/template-saver';
import { Param } from '@/types/param.type';

interface EditorPageProps {
  template: Template;
}

export function EditorPage({ template }: EditorPageProps) {
  const [codeValue, setCodeValue] = useState(template.mjml);
  const [params, setParams] = useState<Param[]>([]);
  const finalMjml = useMemo(() => replaceParams(codeValue, params), [codeValue, params]);

  const keys = useMemo(() => getParams(codeValue), [codeValue]);
  return (
    <div className='relative h-full overflow-hidden'>
      <HorizontalSplitPane
        className='h-full overflow-hidden'
        leftChild={
          <VerticalSplitPane
            topChild={<FormattedEditor defaultValue={codeValue} onChange={setCodeValue} />}
            bottomChild={<ParamEditor keys={[...keys]} onChange={setParams} />}
          />
        }
        rightChild={<EmailRenderer className='overflow-auto h-full bg-slate-50' mjml={finalMjml} />}
      />
      <TemplateSaver templateId={template.id} mjml={codeValue} />
    </div>
  );
}

function replaceParams(html: string, params: Param[]): string {
  let newHtml = html;
  params.forEach((param) => {
    newHtml = newHtml.replaceAll(`{{${param.key}}}`, param.value);
  });
  return newHtml;
}

function getParams(html: string): Set<string> {
  const paramRegex = /\{\{\w+}}/g;
  const params = String(html).match(paramRegex);
  const paramsWithoutBraces = params?.map((param) => param.replace('{{', '').replace('}}', ''));
  return new Set(paramsWithoutBraces);
}
