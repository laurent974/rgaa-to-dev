import { Nav } from '@/components/Nav'
import { NextSeo } from 'next-seo'
import '../styles/main.scss'

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="fr">
      <head>
        <NextSeo
          useAppDir={ true }
          themeColor="#456789"
        />
      </head>

      <body>
        <Nav/>
        { children }
      </body>
    </html>
  )
}
