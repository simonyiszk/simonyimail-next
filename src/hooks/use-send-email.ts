import useSWRMutation from 'swr/mutation';

import { axiosPost } from '@/fetcher/axios-functions';
import { SendEmailDto } from '@/types/send-email.type';

export function useSendEmail() {
  return useSWRMutation('/api/email', axiosPost<unknown, SendEmailDto>);
}
