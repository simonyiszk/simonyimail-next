declare module 'mjml-browser' {
  export default function mjml2html(mjml: string, options?: object): { html: string };
}

declare module 'mjml' {
  export default function mjml2html(mjml: string, options?: object): { html: string };
}
