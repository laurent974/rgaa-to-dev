
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MdxContent } from '@/components/MdxContent';
import path from 'path';

type Frontmatter = {
  title: string;
  date: string;
}

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
}

const getPostContent: (slug: string) => Promise<Post<Frontmatter>> = async (slug: string): Promise<Post<Frontmatter>> => {
  const folderSrc = path.resolve(process.cwd(), "src");
  const folder = `${folderSrc}/posts/`
  const file = `${folder}${slug}.mdx`
  const content: string = await fs.readFile(file, 'utf-8')

  // Serialize the MDX content and parse the frontmatter
  const serialized: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> = await serialize(content, {
    parseFrontmatter: true,
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  return {
    frontmatter,
    serialized
  }
}

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