'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
}

const MdxComponents = {
   /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 style={{ color: '#FFF676' }} {...props} />
  ),

  /** Button */
  Button: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      { ...props }
    />
  ),

  /** SyntaxHighlighter */
  SyntaxHighlighter: (props: any) => (
    <SyntaxHighlighter language="javascript"
      {...props}
    />
  )
}

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}