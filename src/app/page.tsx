import styles from './styles/page.module.scss'
import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

type Post = {
  frontMatter: { [key: string]: any; };
  slug: string;
}

export default function Home(): JSX.Element {
  const posts: any = getPostData()

  return (
    <main className={styles.main}>
      <h1>okok</h1>

      {posts.map((post: any, index: number): JSX.Element => (
        <Link href={ "/blog/" + post.slug } passHref key={index}>
          { post.frontMatter.title }
        </Link>
      ))}
    </main>
  )
}

const getPostData: () => Post[] = (): Post[] => {
  const files: string[] = fs.readdirSync(path.join('src', 'posts'))

  const posts: Post[] = files.map((filename: string): Post => {
    const folder = path.resolve(process.cwd(), "src");
    const markdownWithMeta: string = fs.readFileSync(path.join(folder, 'posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  return posts
}