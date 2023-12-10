import { Template } from '@prisma/client';
import useSWRMutation from 'swr/mutation';

import { axiosPut } from '@/fetcher/axios-functions';
import { EditTemplateDto } from '@/types/template/edit-template-dto.type';

export function useSaveTemplate(id: string) {
  return useSWRMutation(`/api/templates/${id}`, axiosPut<Template, EditTemplateDto>);
}
