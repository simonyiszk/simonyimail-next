import { Template } from '@prisma/client';
import useSWRMutation from 'swr/mutation';

import { axiosPost } from '@/fetcher/axios-functions';
import { CreateTemplateDto } from '@/types/template/create-template-dto.type';

export function useCreateTemplate() {
  return useSWRMutation('/api/templates', axiosPost<Template, CreateTemplateDto>);
}
