export function extractKeyFromUrl(url: string) {
  const urlSplitted = url.split('/');
  const key = urlSplitted[urlSplitted.length - 1];

  return key;
}
