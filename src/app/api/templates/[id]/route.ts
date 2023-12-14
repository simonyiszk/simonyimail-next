import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BadRequestResponse, NotFoundResponse, OkResponse, UnauthorizedResponse } from '@/server-utils/responses';
import { EditTemplateDto } from '@/types/template/edit-template-dto.type';

const prismaClient = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  let body: EditTemplateDto;
  try {
    body = parseAndValidate(await req.json());
  } catch (e: any) {
    return BadRequestResponse(JSON.stringify(e.message));
  }
  const template = await prismaClient.template.update({
    where: { id: params.id },
    data: body,
  });
  return OkResponse(template);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  const templates = await prismaClient.template.findUnique({ where: { id: params.id } });
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
  await prismaClient.template.delete({ where: { id: params.id } });
  return OkResponse();
}
