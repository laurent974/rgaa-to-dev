import fs from 'fs'
import { globby } from "globby"
import matter from "gray-matter"
import Link from "next/link"
import path from "path"
import styles from './Nav.module.scss'

const getPostData = async () => {
  const listAllFilesAndDirs = (dir: string) => globby(`${dir}/**/*`);
  let posts: any = []

  const files = await listAllFilesAndDirs(path.resolve(process.cwd(), "src/posts"));

  files.map((file: string) => {
    const markdownWithMeta: string = fs.readFileSync(file, 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    posts.push({
      frontMatter,
      slug: file.replace(/.*(?=posts)/gm, '').replace('posts/', '').replace('/index', '').split('.')[0]
    })
  })

  return posts
}

export const Nav: any = async () => {
  const posts = await getPostData()

  return (
    <nav aria-label="Menu principal" className={ styles.nav }>
      <ul>
        <li><Link href="/">Accueil</Link></li>

        {
          // collections.map((collection: Collection, index: number): JSX.Element => (
          //   <li className="has-submenu" key={index}>
          //     <Link href="/" aria-expanded="false">{ collection.title }</Link>
          //     <button aria-expanded="false">
          //       <span className="visually-hidden">Ouvre le sous-menu de { collection.title }</span>
          //     </button>

              <ul>
                {posts.map((post: any, index: number): JSX.Element => (
                  <li key={ index }>
                    <Link href={ `/${ post.frontMatter.collection }/` + post.slug } passHref key={index}>
                      { post.frontMatter.title }
                    </Link>
                  </li>
                ))}
              </ul>
          //   {/*</li>
          // )) */}
        }
      </ul>
    </nav>
  )
}
