import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import Frontmatter from '../types/frontmatter';
import Post from '../types/post';
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'

const getPostContent: (slug: string) => Promise<Post<Frontmatter>> = async (slug: string): Promise<Post<Frontmatter>> => {
  const folderSrc: string = path.resolve(process.cwd(), "src");
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

export default getPostContent