'use client';

import axios from 'axios';
import useSWR from 'swr';

import { Spreadsheet } from '@/types/spreasheet.type';

export function useSpreadsheet(id: string) {
  return useSWR(['spreadsheet', id], async () => {
    const response = await axios.get<Spreadsheet>('/api/spreadsheet/' + id);
    return response.data;
  });
}
