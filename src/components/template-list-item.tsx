import { Template } from '@prisma/client';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface TemplateListItemProps extends HTMLAttributes<HTMLDivElement> {
  template: Template;
}

export function TemplateListItem({ template }: TemplateListItemProps) {
  return (
    <Link href={`/templates/${template.id}`}>
      <div className='bg-white rounded-lg shadow-sm w-60 h-40 flex flex-col overflow-hidden hover:shadow-lg transition-shadow'>
        <div className='flex-1 bg-slate-200'></div>
        <p className='py-4 text-center'>{template.name}</p>
      </div>
    </Link>
  );
}
