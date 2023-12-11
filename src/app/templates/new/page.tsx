'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { ErrorDisplay } from '@/components/common/status-display/error-display';
import { useCreateTemplate } from '@/hooks/use-create-template';

export default function TemplateCreatePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMutating, trigger, error } = useCreateTemplate();
  const onSubmit = () => {
    if (inputRef.current?.value) {
      trigger({ name: inputRef.current.value }).then((template) => {
        router.push(`/templates/${template.id}/edit`);
      });
    }
  };
  return (
    <main className='max-w-xl w-full flex flex-col gap-5'>
      <Card>
        <h2>Új sablon</h2>
        <div>
          <label htmlFor='template-name'>Név</label>
          <input id='template-name' ref={inputRef} placeholder='Az én sablonom' className='w-full' />
        </div>
        <Button variant='primary' isLoading={isMutating} onClick={onSubmit}>
          Mentés
        </Button>
        {error && <ErrorDisplay text={error.message} />}
      </Card>
    </main>
  );
}
