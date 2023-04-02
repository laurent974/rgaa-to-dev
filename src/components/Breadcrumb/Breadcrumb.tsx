'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiHomeLine } from 'react-icons/ri'
import styles from './Breadcrumb.module.scss'

export const Breadcrumb = () => {
  const path = usePathname().replace('/', '').split('/')

  return (
    <nav className={styles.breadcrumb} aria-label="Fil d'arianne">
      <ol className={styles.breadcrumbList}>
        <li>
          <Link href="/" className={styles.breadcrumbHome}>
            <RiHomeLine aria-hidden="true" />
            <span className="visually-hidden">Accueil</span>
          </Link>
        </li>

        {path.map((item, index, path) => {
          return (
            <li key={index} className={styles.breadcrumbItem}>
              {index + 1 === path.length ? (
                <span aria-current="page">{item}</span>
              ) : (
                <Link href="#">{item}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
