import { EmailRenderer } from '@/components/email-renderer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = await prisma.template.findUnique({
    where: { id },
  });
  if (!template) {
    return (
      <main>
        <h1>Sablon nem található</h1>
      </main>
    );
  }
  return (
    <main>
      <h1>{template.name}</h1>
      <EmailRenderer className='rounded-md mt-10' mjml={template.mjml} />
    </main>
  );
}
