import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Ensures locales are always in the URL prefix
});

export const config = {
  // Match all pathnames except for
  // - API routes (/api)
  // - Static files / assets (_next, public, favicon.ico, images)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
