import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'
import Post from '@/lib/types/Post';
import Frontmatter from '@/lib/types/Frontmatter';
import { MdxContent } from '@/components/mdx/MdxContent';

const getCollectionContent: (collection: string) => Promise<Post<Frontmatter>> = async (collection: string): Promise<Post<Frontmatter>> => {
  const folderSrc: string = path.resolve(process.cwd(), "src");
  const folder = `${folderSrc}/posts/collections/`
  const file = `${folder}${collection}.mdx`
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

const Collection: (props: any) => Promise<JSX.Element> = async (props: any): Promise<JSX.Element> => {
  const collection: string = props.params.collection
  const { frontmatter, serialized } = await getCollectionContent(collection)

  return (
    <div>
      collection
      { frontmatter.title }
      <MdxContent source={ serialized }/>
    </div>
  )
}

export default Collection