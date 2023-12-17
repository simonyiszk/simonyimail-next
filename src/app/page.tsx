'use client';

import { Template } from '@prisma/client';
import { useEffect, useState } from 'react';

import { SendAll } from '@/components/flow/send-all';
import { SenderPreview } from '@/components/flow/sender-preview/sender-preview';
import { SubjectInput } from '@/components/flow/subject-input';
import { TargetSelector } from '@/components/flow/target-selector/target-selector';
import { TemplateSelector } from '@/components/flow/template-selector';
import { TargetWithEmail } from '@/types/target.type';

export default function MainPage() {
  const [targetsWithEmail, setTargetsWithEmail] = useState<TargetWithEmail[]>();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [subject, setSubject] = useState<string>();
  useEffect(() => {
    setSelectedTemplate(undefined);
    setSubject(undefined);
  }, [targetsWithEmail]);

  useEffect(() => {
    setSubject(undefined);
  }, [selectedTemplate]);

  return (
    <main className='max-w-xl w-full flex flex-col gap-5'>
      <TargetSelector onTargetSelected={setTargetsWithEmail} />
      {targetsWithEmail && <TemplateSelector targets={targetsWithEmail} onSelectedTemplate={setSelectedTemplate} />}
      {targetsWithEmail && selectedTemplate && <SubjectInput onChange={setSubject} />}
      {targetsWithEmail && selectedTemplate && subject && (
        <SenderPreview targets={targetsWithEmail} template={selectedTemplate} subject={subject} />
      )}
      {targetsWithEmail && selectedTemplate && subject && (
        <SendAll template={selectedTemplate} targets={targetsWithEmail} subject={subject} />
      )}
    </main>
  );
}
