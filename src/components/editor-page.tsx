import { useMemo, useState } from 'react';

import { FormattedEditor } from '@/components/formatted-editor';
import { ParamEditor } from '@/components/param-editor';
import { HorizontalSplitPane } from '@/components/split-pane/horizontal-split-pane';
import { VerticalSplitPane } from '@/components/split-pane/vertical-split-pane';
import { Param } from '@/types/param.types';
import { getHtmlForMjml } from '@/utils/convert-mjml';

export function EditorPage() {
  const [codeValue, setCodeValue] = useState('');
  const [params, setParams] = useState<Param[]>([]);
  const templateHtml = useMemo(() => getHtmlForMjml(codeValue), [codeValue]);
  const finalHtml = useMemo(() => replaceParams(templateHtml, params), [templateHtml, params]);

  const keys = useMemo(() => getParamsFromHtml(templateHtml), [templateHtml]);
  return (
    <HorizontalSplitPane
      className='h-full overflow-hidden'
      leftChild={
        <VerticalSplitPane
          topChild={<FormattedEditor onChange={setCodeValue} />}
          bottomChild={<ParamEditor keys={[...keys]} onChange={setParams} />}
        />
      }
      rightChild={<div className='overflow-auto h-full bg-slate-50' dangerouslySetInnerHTML={{ __html: finalHtml }} />}
    />
  );
}

function replaceParams(html: string, params: Param[]): string {
  let newHtml = html;
  params.forEach((param) => {
    newHtml = newHtml.replaceAll(`{{${param.key}}}`, param.value);
  });
  return newHtml;
}

function getParamsFromHtml(html: string): Set<string> {
  const paramRegex = /\{\{\w+}}/g;
  const params = String(html).match(paramRegex);
  const paramsWithoutBraces = params?.map((param) => param.replace('{{', '').replace('}}', ''));
  return new Set(paramsWithoutBraces);
}
