'use client';

import axios from 'axios';
import useSWR from 'swr';

import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

export function useSpreadsheetValues(id: string) {
  return useSWR(
    ['spreadsheet-values', id],
    async () => {
      const response = await axios.get<SpreadsheetValues>('/api/spreadsheet/' + id + '/values');
      return response.data;
    },
    { revalidateOnFocus: false }
  );
}
