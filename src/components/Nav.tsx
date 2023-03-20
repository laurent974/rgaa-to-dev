import Collection from "@/lib/types/Collection"
import PostDetail from "@/lib/types/PostDetail"
import fs, { Dirent } from 'fs'
import matter from "gray-matter"
import Link from "next/link"
import path from "path"

const getPostData: () => PostDetail[] = () => {
  const files: Dirent[] = fs.readdirSync(path.join('src', 'posts'), { withFileTypes: true }).filter(dirent => dirent.isFile())
  const posts: PostDetail[] = files.map((filename: Dirent): PostDetail => {
    const folder = path.resolve(process.cwd(), "src");
    const markdownWithMeta: string = fs.readFileSync(path.join(folder, 'posts', filename.name), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.name.split('.')[0]
    }
  })

  return posts
}

const Nav: () => JSX.Element = (): JSX.Element => {
  const posts: any = getPostData()

  const collections: Collection[] = [
    { title: 'Conception de projet', slug: 'conception-de-projet', url: '/conception-de-projet' },
    { title: 'UX / UI', slug: 'ux-ui', url: '/ux-ui' },
    { title: 'Développement', slug: 'developpement', url: '/developpement' }
  ]

  return (
    <nav aria-label="Menu principal">
      <ul>
        <li><Link href="/">Accueil</Link></li>

        {
          collections.map((collection: Collection, index: number): JSX.Element => (
            <li className="has-submenu" key={index}>
              <Link href="/" aria-expanded="false">{ collection.title }</Link>
              <button aria-expanded="false">
                <span className="visually-hidden">Ouvre le sous-menu de { collection.title }</span>
              </button>

              <ul>
                {posts.filter((post:any) => post.frontMatter.collection === collection.slug).map((post: any, index: number): JSX.Element => (
                  <li key={ index }>
                    <Link href={ `/${ post.frontMatter.collection }/` + post.slug } passHref key={index}>
                      { post.frontMatter.title }
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav