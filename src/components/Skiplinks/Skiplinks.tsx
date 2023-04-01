import Link from 'next/link'
import styles from './Skiplinks.module.scss'

export const Skiplinks = () => {
  return (
    <div className={styles.skiplinks}>
      <nav aria-label="Accès rapide">
        <ul className={styles.list}>
          <li>
            <Link href="#main" className={styles.button}>
              Contenu principal
            </Link>
          </li>
          <li>
            <Link href="#nav" className={styles.button}>
              Menu principal
            </Link>
          </li>
          <li>
            <Link href="#footer" className={styles.button}>
              Pied de page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
