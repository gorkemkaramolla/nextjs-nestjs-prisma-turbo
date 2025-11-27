/**
 * Generic href creator - simplified version without Dub-specific logic
 * Supports query parameters including UTM tracking
 */
export function createHref(
  path: string,
  domain?: string,
  options?: Record<string, string | boolean | undefined>
): string {
  // Separate query params from other options
  const queryParams: Record<string, string> = {};
  let needsHttps = false;

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'needsHttps' && typeof value === 'boolean') {
        needsHttps = value;
      } else if (value !== undefined && value !== false) {
        queryParams[key] = String(value);
      }
    });
  }

  // Build base URL
  let baseUrl: string;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    // If path is already absolute URL, use it as base
    baseUrl = path;
  } else if (domain) {
    // If domain provided, construct full URL
    const protocol = needsHttps ? 'https://' : 'http://';
    baseUrl = `${protocol}${domain}${path.startsWith('/') ? path : `/${path}`}`;
  } else {
    // Otherwise use path as is (for relative URLs)
    baseUrl = path;
  }

  // Append query parameters if any
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  if (queryString) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${queryString}`;
  }

  return baseUrl;
}
