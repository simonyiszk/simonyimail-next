'use client';

import { Template } from '@prisma/client';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';

import { Dropdown } from '@/components/common/dropdown/dropdown';
import { DropdownButtonItem, DropdownLinkItem } from '@/components/common/dropdown/dropdown-item';

interface TemplateListItemProps extends HTMLAttributes<HTMLDivElement> {
  template: Template;
}

export function TemplateListItem({ template }: TemplateListItemProps) {
  return (
    <Link href={`/templates/${template.id}`}>
      <div className='bg-white rounded-lg shadow-sm w-60 h-20 hover:shadow-lg transition-shadow flex justify-between items-center p-5'>
        <p className='text-center truncate'>{template.name}</p>
        <Dropdown button={<TbDots className='w-5 h-5 text-gray-400' />}>
          <DropdownButtonItem onClick={() => {}} icon={TbTrash}>
            Törlés
          </DropdownButtonItem>
          <DropdownLinkItem href={`/templates/${template.id}/edit`} icon={TbEdit}>
            Szerkesztés
          </DropdownLinkItem>
        </Dropdown>
      </div>
    </Link>
  );
}
