'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { ErrorDisplay } from '@/components/error-display';
import { Loading } from '@/components/loading';
import { Navbar } from '@/components/navbar';
import { useCreateTemplate } from '@/hooks/use-create-template';

export default function TemplateCreatePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMutating, trigger, error } = useCreateTemplate();
  const onSubmit = () => {
    if (inputRef.current?.value) {
      trigger({ name: inputRef.current.value }).then((template) => {
        router.push(`/templates/${template.id}`);
      });
    }
  };
  return (
    <>
      <Navbar />
      <main className='flex flex-col gap-4 bg-white rounded-md p-5 mx-auto w-80 max-w-full shadow-sm my-5'>
        <h3>Új sablon</h3>
        <div>
          <label htmlFor='template-name'>Név</label>
          <input id='template-name' ref={inputRef} placeholder='Az én sablonom' className='w-full' />
        </div>
        <button className='primary' onClick={onSubmit}>
          {isMutating && <Loading />}Mentés
        </button>
        {error && <ErrorDisplay text={error.message} />}
      </main>
    </>
  );
}
