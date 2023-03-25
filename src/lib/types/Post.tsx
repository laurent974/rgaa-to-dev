import { MDXRemoteSerializeResult } from 'next-mdx-remote'

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult
  frontmatter: TFrontmatter
}

export default Post
