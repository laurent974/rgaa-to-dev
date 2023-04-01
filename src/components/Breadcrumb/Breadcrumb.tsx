'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Breadcrumb.module.scss'

export const Breadcrumb = () => {
  const path = usePathname().replace('/', '').split('/')

  return (
    <nav className={styles.breadcrumb} aria-label="Fil d'arianne">
      <ol>
        <li>
          <Link href="/">Accueil</Link>
        </li>

        {path.map((item, index) => {
          return (
            <li key={index}>
              <Link href="#" aria-current="page">
                {item}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
