import styles from './styles/page.module.scss'
import fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function Home() {
  const posts: any = getPostData()

  return (
    <main className={styles.main}>
      <h1>okok</h1>

      {posts.map((post: any, index: number) => (
        <Link href={ "/blog/" + post.slug } passHref key={index}>
          {post.frontMatter.title}
        </Link>
      ))}
    </main>
  )
}

const getPostData = () => {
  const files = fs.readdirSync(path.join('src', 'posts'))

  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('src', 'posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  return posts
}