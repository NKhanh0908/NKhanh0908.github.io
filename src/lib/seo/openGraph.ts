import { Metadata } from 'next';

export interface OpenGraphParams {
  title: string;
  description: string;
  url: string;
  locale: string;
}

export function getOpenGraphMetadata({ title, description, url, locale }: OpenGraphParams): Metadata['openGraph'] {
  return {
    title,
    description,
    url,
    siteName: 'Nguyen Quoc Khanh Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nguyen Quoc Khanh — Backend-focused Fullstack Developer',
      },
    ],
    locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    type: 'website',
  };
}
