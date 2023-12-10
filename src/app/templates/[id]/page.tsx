import { PrismaClient } from '@prisma/client';

import { EmailRenderer } from '@/components/email-renderer';

const prismaClient = new PrismaClient();

export default async function TemplatePage({ params }: { params: { id: string } }) {
  const template = await prismaClient.template.findUnique({
    where: { id: params.id },
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
      <EmailRenderer mjml={template.mjml} />
    </main>
  );
}
