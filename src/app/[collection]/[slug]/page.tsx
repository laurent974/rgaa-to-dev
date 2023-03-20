import { MdxContent } from '@/components/mdx/MdxContent';
import getPostContent from '@/lib/api/get-post-content';

const BlogPage:(props: any) => Promise<JSX.Element> = async (props: any): Promise<JSX.Element> => {
  const slug: string = props.params.slug
  const { frontmatter, serialized } = await getPostContent(slug)

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <MdxContent source={ serialized }/>
    </div>
  )
}

export default BlogPage