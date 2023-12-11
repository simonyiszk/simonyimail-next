import { Template } from '@prisma/client';
import { useMemo, useState } from 'react';

import { HorizontalSplitPane } from '@/components/common/split-pane/horizontal-split-pane';
import { VerticalSplitPane } from '@/components/common/split-pane/vertical-split-pane';
import { FormattedEditor } from '@/components/editor/formatted-editor';
import { ParamEditor } from '@/components/editor/param-editor';
import { TemplateSaver } from '@/components/editor/template-saver';
import { EmailRenderer } from '@/components/email-renderer';
import { Param } from '@/types/param.type';
import { getParams, replaceParams } from '@/utils/parameter.utils';

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
