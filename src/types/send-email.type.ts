export type SendEmailDto = {
  to: string;
  from?: string;
  html: string;
  subject: string;
};
