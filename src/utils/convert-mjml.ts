import mjml2html from 'mjml-browser';

export function getHtmlForMjml(html: string): string {
  try {
    return mjml2html(html).html;
  } catch (e) {
    return String(e);
  }
}
