import { Template } from '@prisma/client';
import { useMemo, useState } from 'react';

import { FormattedEditor } from '@/components/formatted-editor';
import { ParamEditor } from '@/components/param-editor';
import { HorizontalSplitPane } from '@/components/split-pane/horizontal-split-pane';
import { VerticalSplitPane } from '@/components/split-pane/vertical-split-pane';
import { TemplateSaver } from '@/components/template-saver';
import { Param } from '@/types/param.type';
import { getHtmlForMjml } from '@/utils/convert-mjml';

interface EditorPageProps {
  template: Template;
}

export function EditorPage({ template }: EditorPageProps) {
  const [codeValue, setCodeValue] = useState(template.mjml);
  const [params, setParams] = useState<Param[]>([]);
  const templateHtml = useMemo(() => getHtmlForMjml(codeValue), [codeValue]);
  const finalHtml = useMemo(() => replaceParams(templateHtml, params), [templateHtml, params]);

  const keys = useMemo(() => getParamsFromHtml(templateHtml), [templateHtml]);
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
        rightChild={
          <div className='overflow-auto h-full bg-slate-50' dangerouslySetInnerHTML={{ __html: finalHtml }} />
        }
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

function getParamsFromHtml(html: string): Set<string> {
  const paramRegex = /\{\{\w+}}/g;
  const params = String(html).match(paramRegex);
  const paramsWithoutBraces = params?.map((param) => param.replace('{{', '').replace('}}', ''));
  return new Set(paramsWithoutBraces);
}
