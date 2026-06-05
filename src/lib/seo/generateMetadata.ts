import { Metadata } from 'next';
import { getOpenGraphMetadata } from './openGraph';

export interface MetadataParams {
  locale: string;
  title: string;
  description: string;
  path: string;
}

export function constructMetadata({ locale, title, description, path }: MetadataParams): Metadata {
  const url = `https://nkhanh0908.github.io/${locale}${path}`;
  return {
    title,
    description,
    metadataBase: new URL('https://nkhanh0908.github.io'),
    alternates: {
      canonical: url,
      languages: {
        'en': `/en${path}`,
        'vi': `/vi${path}`,
      },
    },
    openGraph: getOpenGraphMetadata({ title, description, url, locale }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
