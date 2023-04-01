import fs from 'fs'
import path from 'path'
import styles from './Nav.module.scss'
import matter from 'gray-matter'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Image from 'next/image'
import {
  RiCodeLine,
  RiImageEditLine,
  RiPsychotherapyLine,
  RiHomeLine,
  RiMessage3Line,
  RiArrowRightSLine,
} from 'react-icons/ri'

type MenuItem = {
  title: string
  link: string
  children?: MenuItem[]
  icon?: string
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
      <ul className={styles.navList} id={id}>
        {i === 0 ? (
          <li key={`accueil-${Math.random()}`}>
            <Link href="/" className={styles.navLink}>
              <RiHomeLine aria-hidden="true" className={styles.navIcon} />
              <span className="visually-hidden">Accueil</span>
            </Link>
          </li>
        ) : (
          ''
        )}

        {menuItems
          .filter((item) => item.link.indexOf('index') < 0)
          .map((item, index) => (
            <Fragment key={index}>
              <li className={item.children ? styles.navItemWithSubmenu : ''}>
                <Link href={item.link} className={styles.navLink}>
                  {item.link === '/conception-de-projet' ? (
                    <RiPsychotherapyLine
                      aria-hidden="true"
                      className={styles.navIcon}
                    />
                  ) : (
                    ''
                  )}
                  {item.link === '/developpement' ? (
                    <RiCodeLine aria-hidden="true" className={styles.navIcon} />
                  ) : (
                    ''
                  )}
                  {item.link === '/ux-ui' ? (
                    <RiImageEditLine
                      aria-hidden="true"
                      className={styles.navIcon}
                    />
                  ) : (
                    ''
                  )}

                  <span className="visually-hidden">{item.title}</span>
                </Link>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded="false"
                    aria-controls={item.link.replace(/\//g, '_')}
                    aria-label={`Ouvrir le sous-menu de ${item.title}`}
                    className={styles.navExpandButton}
                  >
                    <RiArrowRightSLine />
                  </button>
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
                  <Link href="/contact" className={styles.navLink}>
                    <RiMessage3Line
                      aria-hidden="true"
                      className={styles.navIcon}
                    />
                    <span className="visually-hidden">Contact</span>
                  </Link>
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
    <div className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo/logo-small.svg"
          width={40}
          height={40}
          alt="Allez page d'accueil"
        />
        <span className="visually-hidden">Allez à la page d&aposaccueil</span>
      </Link>

      <nav id="nav" className={styles.nav} aria-label="Menu principal">
        {renderMenu(menuData, index)}
      </nav>
    </div>
  )
}
