import Link from "next/link"

const Nav: () => JSX.Element = (): JSX.Element => {
  return (
    <nav aria-label="Menu principal">
      <ul>
        <li><Link href="/">Accueil</Link></li>

        <li className="has-submenu">
          <Link href="/" aria-expanded="false">Conception de projet</Link>
          <button aria-expanded="false">
            <span className="visually-hidden">Ouvre le sous-menu de Conception de projet</span>
          </button>

          <ul>
            <li><Link href="/">Système de navigation</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Nav