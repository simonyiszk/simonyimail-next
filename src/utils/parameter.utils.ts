export function getParams(html: string): Set<string> {
  const paramRegex = /\{\{\w+}}/g;
  const params = String(html).match(paramRegex);
  const paramsWithoutBraces = params?.map((param) => param.replace('{{', '').replace('}}', ''));
  return new Set(paramsWithoutBraces);
}
