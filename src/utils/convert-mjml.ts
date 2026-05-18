export async function getHtmlForMjml(mjml: string): Promise<string> {
  if (typeof window !== 'undefined') {
    console.log('hello');
    return await import('mjml-browser')
      .then((mjmlBrowser) => mjmlBrowser.default(mjml).html)
      .catch(() => 'MJML converter error');
  } else {
    return 'This was rendered on the server side somehow, this is an error.';
  }
}
