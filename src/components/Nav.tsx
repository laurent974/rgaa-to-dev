import Link from "next/link"

const Nav: () => JSX.Element = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>

        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav