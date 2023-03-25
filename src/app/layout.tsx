import { Nav } from '@/components/Nav'
import { NextSeo } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '../../next-seo.config'
import '../styles/main.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="fr">
      <head>
        <NextSeo {...NEXT_SEO_DEFAULT} useAppDir={true} themeColor="#456789" />
      </head>

      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
