import fs from 'fs'
import path from 'path'
import styles from './Nav.module.scss'
import matter from 'gray-matter'
import Link from 'next/link'
import { Fragment } from 'react'

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
  const index = 0
  const menuData: MenuItem[] = buildMenuData(
    path.join(process.cwd(), 'src', 'posts')
  )
  const lastItem = menuData[menuData.length - 1]

  const renderMenu = (menuItems: MenuItem[], i: number, id?: string) => {
    return (
      <ul className={styles.list} id={id}>
        {i === 0 ? (
          <li key={`accueil-${Math.random()}`}>
            <Link href="/">Accueil</Link>
          </li>
        ) : (
          ''
        )}

        {menuItems
          .filter((item) => item.link.indexOf('index') < 0)
          .map((item, index) => (
            <Fragment key={index}>
              <li>
                <Link href={item.link}>{item.title}</Link>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded="false"
                    aria-controls={item.link.replace(/\//g, '_')}
                    aria-label={`Ouvrir le sous-menu de ${item.title}`}
                  ></button>
                ) : (
                  ''
                )}
                {item.children &&
                  renderMenu(
                    item.children,
                    i + 1,
                    item.link.replace(/\//g, '_')
                  )}
              </li>

              {item.link === lastItem.link ? (
                <li key={`contact-${Math.random()}`}>
                  <Link href="/contact">Contact</Link>
                </li>
              ) : (
                ''
              )}
            </Fragment>
          ))}
      </ul>
    )
  }

  return (
    <nav className={styles.nav} aria-label="Menu principal">
      {renderMenu(menuData, index)}
    </nav>
  )
}
