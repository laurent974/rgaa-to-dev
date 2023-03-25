import { Nav } from '@/components/Nav'
import { Metadata } from 'next'
import '../styles/main.scss'

export const metadata: Metadata = {
  title: { default: 'Accueil', template: '%s | RGAA-101.fr' },
  description:
    "Le facilitateur de l'intégration de composants RGAA dans votre application.",
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Yen-Pon Laurent',
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
  ],
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    url: 'https://rgaa-101.fr',
    title: "RGAA-101.fr, le site de l'accessibilité pour les developpeurs.",
    description:
      'Ce site est dédié aux artisans des sites internet ayant pour contrainte de faire un site accessibile en France.',
    siteName: 'RGAA-101.fr',
    images: [
      {
        url: 'https://rgaa-101.fr/og.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@creator',
    images: 'https://rgaa-101.fr/og.png',
  },
  other: {
    'msapplication-TileColor': '#ffc40d',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="fr">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
