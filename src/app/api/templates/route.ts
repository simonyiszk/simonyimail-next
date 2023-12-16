import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth.config';
import { BadRequestResponse, OkResponse, UnauthorizedResponse } from '@/server-utils/responses';
import { CreateTemplateDto } from '@/types/template/create-template-dto.type';

const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  let body: CreateTemplateDto;
  try {
    body = parseAndValidate(await req.json());
  } catch (e: any) {
    return BadRequestResponse(JSON.stringify(e.message));
  }
  const template = await prismaClient.template.create({
    data: { ...body, mjml: '<mjml><mj-body></mj-body></mjml>' },
  });
  return OkResponse(template);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  const templates = await prismaClient.template.findMany();
  return OkResponse(templates);
}

function parseAndValidate(body: any): CreateTemplateDto {
  if (!body.name) throw new Error('Name is required');
  return { name: body.name };
}
