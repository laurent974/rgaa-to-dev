import { MdxContent } from '@/components/mdx/MdxContent'
import getPostContent from '@/lib/api/get-post-content'

const BlogPage = async ({
  params,
}: {
  params: { slug: string[] }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const arrayToPath = (arr: string[]) => arr.join('/')
  const path: string = arrayToPath(params.slug)
  const { frontmatter, serialized } = await getPostContent(path)

  return (
    <div>
      <h1>parametres</h1>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <MdxContent source={serialized} />
    </div>
  )
}

export default BlogPage
