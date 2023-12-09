'use client';

import useSWR from 'swr';

import { axiosGet } from '@/fetcher/axios-functions';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';

export function useSpreadsheetValues(id: string) {
  return useSWR(`/api/spreadsheet/${id}/values`, axiosGet<SpreadsheetValues>, { revalidateOnFocus: false });
}
