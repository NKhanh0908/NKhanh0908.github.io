import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, Locale } from '@/i18n/config';
import { inter } from '@/styles/fonts';
import '@/app/globals.css';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for NextIntlClientProvider
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-background text-primary-text selection:bg-accent/20 selection:text-accent">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
