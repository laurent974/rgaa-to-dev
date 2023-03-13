import type { NextSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'RGAA to dev',
  description: 'Le facilitateur de l\'intégration de composants RGAA dans votre application.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rgaa-to-dev.fr/',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
        secureUrl: 'https://www.test.ie/secure-og-image-a-01.jpg',
      },
    ],
    siteName: 'SiteName A',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
};