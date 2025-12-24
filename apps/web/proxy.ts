import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { headers } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';

let defaultLocale = 'en';
let locales = ['en', 'tr'];
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
  let headers = { 'accept-language': acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const locale = getLocale(request);
  const pathname = request.nextUrl.pathname;
  console.log(locale);
  console.log('pathname:' + pathname);
  return NextResponse.next();
}
