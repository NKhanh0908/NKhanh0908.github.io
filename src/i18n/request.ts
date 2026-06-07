import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: {
      common: (await import(`./locales/${resolvedLocale}/common.json`)).default,
      hero: (await import(`./locales/${resolvedLocale}/hero.json`)).default,
      about: (await import(`./locales/${resolvedLocale}/about.json`)).default,
      experience: (await import(`./locales/${resolvedLocale}/experience.json`)).default,
      skills: (await import(`./locales/${resolvedLocale}/skills.json`)).default,
      projects: (await import(`./locales/${resolvedLocale}/projects.json`)).default,
      contact: (await import(`./locales/${resolvedLocale}/contact.json`)).default,
    },
  };
});
