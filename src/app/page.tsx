'use client';

import { Template } from '@prisma/client';
import { useMemo, useState } from 'react';

import { EmailFieldSelector } from '@/components/email-field-selector';
import { SenderPreview } from '@/components/sender-preview';
import { SheetSelector } from '@/components/sheet-selector/sheet-selector';
import { TemplateSelector } from '@/components/template-selector';
import { Target, TargetWithEmail } from '@/types/target.type';

export default function MainPage() {
  const [rawTargets, setRawTargets] = useState<Target[]>();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [emailField, setEmailField] = useState<string>();

  const targetsWithEmail = useMemo<TargetWithEmail[] | undefined>(() => {
    if (!rawTargets || !emailField) return undefined;
    return rawTargets.map((target) => ({ ...target, email: target[emailField] }));
  }, [rawTargets, emailField]);

  return (
    <main className='max-w-xl w-full flex flex-col gap-5'>
      <SheetSelector onSheetValuesSelected={setRawTargets} />
      {rawTargets && <TemplateSelector targets={rawTargets} onSelectedTemplate={setSelectedTemplate} />}
      {rawTargets && selectedTemplate && (
        <EmailFieldSelector headers={Object.keys(rawTargets[0] ?? {})} onSelectedEmailField={setEmailField} />
      )}
      {targetsWithEmail && selectedTemplate && <SenderPreview targets={targetsWithEmail} template={selectedTemplate} />}
    </main>
  );
}
