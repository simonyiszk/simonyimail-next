import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

import { Navbar } from '@/components/navbar';
import { TemplateListItem } from '@/components/template-list-item';

const prismaClient = new PrismaClient();

export default async function TemplateListPage() {
  const templates = await prismaClient.template.findMany();
  return (
    <>
      <Navbar />
      <main className='mx-auto container mt-10'>
        <div className='flex gap-5 items-center'>
          <h2>Sablonok</h2>
          <Link href='/templates/new' className='button primary'>
            Új sablon
          </Link>
        </div>
        {templates.length === 0 && <p>Nincs megjeleníthető sablon.</p>}
        <div className='mt-10 flex gap-5 flex-wrap'>
          {templates.map((template) => (
            <TemplateListItem template={template} key={template.id} />
          ))}
        </div>
      </main>
    </>
  );
}
