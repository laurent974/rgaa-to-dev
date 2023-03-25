import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Frontmatter from '../types/Frontmatter'
import Post from '../types/Post'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { promises as fs } from 'fs'
import * as oldfs from 'fs'

const getPostContent: (slug: string) => Promise<Post<Frontmatter>> = async (
  slug: string
): Promise<Post<Frontmatter>> => {
  const folderSrc: string = path.resolve(process.cwd(), 'src')
  const folder = `${folderSrc}/posts/`
  const file = `${folder}${slug}.mdx`
  let content: string

  try {
    await fs.access(
      file,
      oldfs.constants.F_OK | oldfs.constants.W_OK | oldfs.constants.R_OK
    )
    content = await fs.readFile(file, 'utf-8')
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.log(error)
    content = await fs.readFile(`${folder}${slug}/index.mdx`, 'utf-8')
  }

  // Serialize the MDX content and parse the frontmatter
  const serialized: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  > = await serialize(content, {
    parseFrontmatter: true,
  })

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter

  return {
    frontmatter,
    serialized,
  }
}

export default getPostContent
