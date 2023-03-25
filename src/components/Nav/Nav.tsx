import fs from 'fs'
import path from 'path'
import styles from './Nav.module.scss'
import matter from 'gray-matter'
import Link from 'next/link'

type MenuItem = {
  title: string
  link: string
  children?: MenuItem[]
}

const buildMenu = (parentFolder: string, currentFolder: string): MenuItem => {
  const racine: string = path.join(process.cwd(), 'src', 'posts')
  const currentPath: string = path.join(parentFolder, currentFolder)
  const items: MenuItem[] = fs
    .readdirSync(currentPath)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const markdownWithMeta: string = fs.readFileSync(
        path.join(currentPath, name),
        'utf-8'
      )
      const { data: frontMatter } = matter(markdownWithMeta)

      return {
        title: frontMatter.title,
        link: path.join(
          currentPath.replace(racine, ''),
          name.replace('.mdx', '')
        ),
      }
    })

  const children: MenuItem[] = fs
    .readdirSync(currentPath)
    .filter((name) => fs.lstatSync(path.join(currentPath, name)).isDirectory())
    .map((name) => buildMenu(currentPath, name))

  if (children.length) {
    const markdownWithMeta: string = fs.readFileSync(
      path.join(parentFolder, currentFolder, '/index.mdx'),
      'utf-8'
    )
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      title: frontMatter.title,
      link: currentPath.replace(racine, ''),
      children: [...items, ...children],
    }
  }

  const markdownWithMeta: string = fs.readFileSync(
    path.join(parentFolder, currentFolder, '/index.mdx'),
    'utf-8'
  )
  const { data: frontMatter } = matter(markdownWithMeta)

  return {
    title: frontMatter.title,
    link: currentPath.replace(racine, ''),
    children: items,
  }
}

const buildMenuData = (rootFolder: string): MenuItem[] => {
  return fs
    .readdirSync(rootFolder)
    .filter((name) => fs.lstatSync(path.join(rootFolder, name)).isDirectory())
    .map((name) => buildMenu(rootFolder, name))
}

export const Nav = () => {
  const menuData: MenuItem[] = buildMenuData(
    path.join(process.cwd(), 'src', 'posts')
  )

  const renderMenu = (menuItems: MenuItem[]) => (
    <ul className={styles.list}>
      {menuItems
        .filter((item) => item.link.indexOf('index') < 0)
        .map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.title}</Link>
            {item.children && renderMenu(item.children)}
          </li>
        ))}
    </ul>
  )

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        {renderMenu(menuData)}
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}
