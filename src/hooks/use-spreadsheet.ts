'use client';

import useSWR from 'swr';

import { axiosGet } from '@/fetcher/axios-functions';
import { Spreadsheet } from '@/types/spreasheet.type';

export function useSpreadsheet(id: string) {
  return useSWR('/api/spreadsheet/' + id, axiosGet<Spreadsheet>(), { revalidateOnFocus: false });
}
