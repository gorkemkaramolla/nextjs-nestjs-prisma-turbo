export function getDomainWithoutWWW(url: string): string {
  if (!url) return '';
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url.replace(/^www\./, '');
  }
}

export function getUrlFromString(str: string): string {
  if (!str) return '';
  try {
    // If it's already a valid URL, return it
    return new URL(str).href;
  } catch {
    // If not, try adding https://
    try {
      return new URL(`https://${str}`).href;
    } catch {
      return str;
    }
  }
}
