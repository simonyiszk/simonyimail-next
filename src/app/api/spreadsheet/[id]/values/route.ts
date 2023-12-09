import axios, { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  try {
    const response = await axios.get<SpreadsheetValues>(
      'https://sheets.googleapis.com/v4/spreadsheets/' + params.id + '/values/A1%3AZ1000',
      {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      }
    );
    return Response.json(response.data);
  } catch (e) {
    if (isAxiosError(e)) {
      return Response.json({ error: e.message }, { status: e.response?.status ?? 500 });
    }
    return Response.json({ error: 'Error' }, { status: 500 });
  }
}