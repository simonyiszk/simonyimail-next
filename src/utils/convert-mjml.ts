export function getHtmlForMjml(mjml: string): string {
  if (typeof window !== 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mjml2html = require('mjml-browser');
      return mjml2html(mjml).html;
    } catch (e) {
      return String(e);
    }
  } else {
    return 'MJML converter error';
  }
}
