import { Param } from '@/types/param.type';

export function getParams(html: string): Set<string> {
  const paramRegex = /\{\{\w+}}/g;
  const params = String(html).match(paramRegex);
  const paramsWithoutBraces = params?.map((param) => param.replace('{{', '').replace('}}', ''));
  return new Set(paramsWithoutBraces);
}

export function replaceParams(html: string, params: Param[]): string {
  let newHtml = html;
  params.forEach((param) => {
    newHtml = newHtml.replaceAll(`{{${param.key}}}`, param.value);
  });
  return newHtml;
}
