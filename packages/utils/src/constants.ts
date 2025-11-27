// Generic constants
export const GOOGLE_FAVICON_URL = 'https://www.google.com/s2/favicons?sz=64&domain_url=';
export const DEFAULT_PAGINATION_LIMIT = 50;

// Domain constants - Make these configurable for your app
export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || 'http://localhost:3000';

// Subdomain sets - Keep for compatibility but make generic
export const APP_HOSTNAMES = new Set(['localhost:3000', 'app.localhost:3000']);
export const PARTNERS_HOSTNAMES = new Set(['partners.localhost:3000']);
export const ADMIN_HOSTNAMES = new Set(['admin.localhost:3000']);
