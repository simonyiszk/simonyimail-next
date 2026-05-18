import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth.config';
import { prisma } from '@/lib/prisma';
import { BadRequestResponse, NotFoundResponse, OkResponse, UnauthorizedResponse } from '@/server-utils/responses';
import { EditTemplateDto } from '@/types/template/edit-template-dto.type';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  let body: EditTemplateDto;
  try {
    body = parseAndValidate(await req.json());
  } catch (e: any) {
    return BadRequestResponse(JSON.stringify(e.message));
  }
  const template = await prisma.template.update({
    where: { id: params.id },
    data: body,
  });
  return OkResponse(template);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  const templates = await prisma.template.findUnique({ where: { id: params.id } });
  if (!templates) return NotFoundResponse('Template not found');
  return OkResponse(templates);
}

function parseAndValidate(body: any): EditTemplateDto {
  if (!body.mjml) throw new Error('MJML content is required');
  return { mjml: body.mjml };
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  await prisma.template.delete({ where: { id: params.id } });
  return OkResponse();
}
