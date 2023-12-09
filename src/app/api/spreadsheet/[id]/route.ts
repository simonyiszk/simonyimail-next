import axios, { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Spreadsheet } from '@/types/spreasheet.type';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  try {
    const response = await axios.get<Spreadsheet>('https://sheets.googleapis.com/v4/spreadsheets/' + params.id, {
      headers: {
        Authorization: `Bearer ${(session as any).accessToken}`,
      },
    });
    return Response.json(response.data);
  } catch (e) {
    if (isAxiosError(e)) {
      return Response.json({ error: e.message }, { status: e.response?.status ?? 500 });
    }
    return Response.json({ error: 'Error' }, { status: 500 });
  }
}
