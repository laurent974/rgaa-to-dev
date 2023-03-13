
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MdxContent } from '@/components/MdxContent';

type Frontmatter = {
  title: string;
  date: string;
}

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
}

const getPostContent = async (slug: string): Promise<Post<Frontmatter>> => {
  const folder = "src/posts/"
  const file = `${folder}${slug}.mdx`
  const content = await fs.readFile(file, 'utf-8')

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(content, {
    parseFrontmatter: true,
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  return {
    frontmatter,
    serialized
  }
}

const BlogPage = async (props: any) => {
  const slug = props.params.slug
  const { frontmatter, serialized } = await getPostContent(slug)

  return (
    <div>
      <h1>Blog page: { slug }</h1>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <MdxContent source={ serialized }/>
    </div>
  )
}

export default BlogPage