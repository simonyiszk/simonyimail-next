import { Template } from '@prisma/generated';
import useSWR from 'swr';

import { axiosGet } from '@/fetcher/axios-functions';

export function useTemplates() {
  return useSWR(`/api/templates`, axiosGet<Template[]>, { revalidateOnFocus: false });
}
