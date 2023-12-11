import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { TbCirclePlus } from 'react-icons/tb';

import { Button } from '@/components/common/button';
import { Navbar } from '@/components/navbar';
import { TemplateListItem } from '@/components/template-list-item';

const prismaClient = new PrismaClient();

export default async function TemplateListPage() {
  const templates = await prismaClient.template.findMany();
  return (
    <main className='mx-auto container mt-10'>
      <div className='flex gap-5 items-center'>
        <h2>Sablonok</h2>
        <Button variant='primary' href='/templates/new'>
          <TbCirclePlus />
          Új sablon
        </Button>
      </div>
      {templates.length === 0 && <p>Nincs megjeleníthető sablon.</p>}
      <div className='mt-10 flex gap-5 flex-wrap'>
        {templates.map((template) => (
          <TemplateListItem template={template} key={template.id} />
        ))}
      </div>
    </main>
  );
}
