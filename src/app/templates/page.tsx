import { TbCirclePlus } from 'react-icons/tb';

import { Button } from '@/components/common/button';
import { TemplateListItem } from '@/components/template-list-item';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function TemplateListPage() {
  const templates = await prisma.template.findMany({ orderBy: { updatedAt: 'desc' } });
  return (
    <main className='mx-auto mt-10'>
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
