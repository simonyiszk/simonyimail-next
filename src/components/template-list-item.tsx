'use client';

import { Template } from '@prisma/client';
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
    <Link href={`/templates/${template.id}`}>
      <div className='bg-white rounded-lg shadow-sm w-60 h-20 hover:shadow-lg transition-shadow flex justify-between items-center p-5'>
        <p className='text-center truncate'>{template.name}</p>
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
    </Link>
  );
}
