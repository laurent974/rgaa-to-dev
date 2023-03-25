import { NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import styles from './Nav.module.scss'

type MenuItem = {
  title: string
  link: string
  children?: MenuItem[]
}

type MenuProps = {
  menuData: MenuItem[]
}

const buildMenu = (parentFolder: string, currentFolder: string): MenuItem => {
  const currentPath = path.join(parentFolder, currentFolder)
  const items = fs.readdirSync(currentPath)
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      return {
        title: name.replace('.mdx', ''),
        link: path.join('/', currentFolder, name.replace('.mdx', ''))
      }
    })
  const children = fs.readdirSync(currentPath)
    .filter(name => fs.lstatSync(path.join(currentPath, name)).isDirectory())
    .map(name => buildMenu(currentPath, name))
  if (children.length) {
    return {
      title: currentFolder,
      link: path.join('/', currentFolder),
      children: [
        ...items,
        ...children
      ]
    }
  }

  return {
    title: currentFolder,
    link: path.join('/', currentFolder),
    children: items
  }
}

const buildMenuData = (rootFolder: string): MenuItem[] => {
  return fs.readdirSync(rootFolder)
    .filter(name => fs.lstatSync(path.join(rootFolder, name)).isDirectory())
    .map(name => buildMenu(rootFolder, name))
}

export const Nav: NextPage<MenuProps> = () => {
  const menuData = buildMenuData(path.join(process.cwd(), 'src', 'posts'))

  const renderMenu = (menuItems: MenuItem[]) => (
    <ul className={styles.list}>
      {menuItems.filter((item) => item.link.indexOf('index') < 0).map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.title}</a>
          {item.children && renderMenu(item.children)}
        </li>
      ))}
    </ul>
  )

  return (
    <nav className={ styles.nav }>
      { renderMenu(menuData) }
    </nav>
  )
}
