import Nav from '@/components/Nav'
import { NextSeo } from 'next-seo'
import './styles/globals.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <NextSeo
          useAppDir={true}
          themeColor="#456789"
        />
      </head>
      <body>
        <Nav/>
        {children}
      </body>
    </html>
  )
}
