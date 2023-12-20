import axios, { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import quotedPrintable from 'quoted-printable';

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
    const response = await axios.post<unknown>(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send/',
      { raw: composeEmail(body.to, body.html, body.subject) },
      {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      }
    );
    return OkResponse(response.data);
  } catch (e) {
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

function composeEmail(to: string, html: string, subject: string) {
  const subjectEncoded = quotedPrintable.encode(subject);
  const emailBody = `To: ${to}\nSubject: ${subjectEncoded}\nContent-Type: text/html; charset="UTF-8"\n\n${html}`;
  return Buffer.from(emailBody).toString('base64');
}
