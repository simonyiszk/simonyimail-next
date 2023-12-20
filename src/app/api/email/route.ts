import axios, { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import MailComposer from 'nodemailer/lib/mail-composer';

import { authOptions } from '@/config/auth.config';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
  UnauthorizedResponse,
} from '@/server-utils/responses';
import { SendEmailDto } from '@/types/send-email.type';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return UnauthorizedResponse();
  let body: SendEmailDto;
  try {
    body = parseAndValidate(await req.json());
  } catch (e: any) {
    return BadRequestResponse(JSON.stringify(e.message));
  }
  try {
    const raw = await composeEmail(body.to, body.html, body.subject);
    const response = await axios.post<unknown>(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send/',
      { raw },
      {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      }
    );
    return OkResponse(response.data);
  } catch (e) {
    console.log(e);
    if (isAxiosError(e)) {
      console.log(e.response?.data);
      return Response.json({ error: e.message }, { status: e.response?.status ?? 500 });
    }
    return InternalServerErrorResponse(JSON.stringify(e));
  }
}

function parseAndValidate(body: object): SendEmailDto {
  if (!body.hasOwnProperty('to')) throw new Error('Missing to');
  if (!body.hasOwnProperty('html')) throw new Error('Missing html');
  if (!body.hasOwnProperty('subject')) throw new Error('Missing subject');
  return body as SendEmailDto;
}

async function composeEmail(to: string, html: string, subject: string) {
  const mailComposer = new MailComposer({
    to,
    subject,
    html,
  });
  const message = await mailComposer.compile().build();
  return Buffer.from(message).toString('base64');
}
