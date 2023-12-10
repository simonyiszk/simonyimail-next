import { Template } from '@prisma/client';
import useSWR from 'swr';

import { axiosGet } from '@/fetcher/axios-functions';

export function useTemplates() {
  return useSWR(`/api/templates`, axiosGet<Template[]>, { revalidateOnFocus: false });
}
