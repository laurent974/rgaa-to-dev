import { MdxContent } from '@/components/mdx/MdxContent';
import getPostContent from '@/lib/api/get-post-content';

const BlogPage:(props: any) => Promise<JSX.Element> = async (props) => {
  const arrayToPath: any = (arr: any[]) => arr.join('/')
  const path = arrayToPath(props.params.slug)
  const { frontmatter, serialized } = await getPostContent(path)

  return (
    <div>
      <h1>parametres</h1>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <MdxContent source={ serialized }/>
    </div>
  )
}

export default BlogPage