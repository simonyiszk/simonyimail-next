'use client';

import { Template } from '@prisma/generated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';

import { Dropdown } from '@/components/common/dropdown/dropdown';
import { DropdownButtonItem, DropdownLinkItem } from '@/components/common/dropdown/dropdown-item';
import { useDeleteTemplate } from '@/hooks/use-delete-template';

interface TemplateListItemProps extends HTMLAttributes<HTMLDivElement> {
  template: Template;
}

export function TemplateListItem({ template }: TemplateListItemProps) {
  const router = useRouter();
  const { trigger, isMutating } = useDeleteTemplate(template.id);
  const onDelete = () => {
    trigger().then(() => {
      router.refresh();
    });
  };
  return (
    <div className='bg-white rounded-lg shadow-xs flex justify-between items-center hover:shadow-lg transition-shadow w-80 min-h-20 p-5'>
      <Link href={`/templates/${template.id}`}>
        <p className='text-start line-clamp-3'>{template.name}</p>
        <p className='text-xs mt-1'>Módosítva: {template.updatedAt.toLocaleString('hu')}</p>
      </Link>
      <Dropdown
        button={
          <div className='button'>
            <TbDots className='w-5 h-5 text-gray-400' />
          </div>
        }
      >
        <DropdownButtonItem confirmNeeded onClick={onDelete} icon={TbTrash} isLoading={isMutating}>
          Törlés
        </DropdownButtonItem>
        <DropdownLinkItem href={`/templates/${template.id}/edit`} icon={TbEdit}>
          Szerkesztés
        </DropdownLinkItem>
      </Dropdown>
    </div>
  );
}
