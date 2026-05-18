import { Template } from '@prisma/generated';
import useSWR from 'swr';

import { axiosGet } from '@/fetcher/axios-functions';

export function useTemplate(id: string) {
  return useSWR(`/api/templates/${id}`, axiosGet<Template>, { revalidateOnFocus: false });
}
