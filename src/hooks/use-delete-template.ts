import useSWRMutation from 'swr/mutation';

import { axiosDelete } from '@/fetcher/axios-functions';

export function useDeleteTemplate(id: string) {
  return useSWRMutation(`/api/templates/${id}`, axiosDelete);
}
