'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
}

const MdxComponents = {
   /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h1 style={{ color: '#FFF676' }} {...props} />
  ),

  /** Button */
  Button: (props: React.HTMLProps<HTMLDivElement>): JSX.Element => (
    <div
      { ...props }
    />
  ),

  /** SyntaxHighlighter */
  SyntaxHighlighter: (props: any): JSX.Element => (
    <SyntaxHighlighter language="javascript"
      {...props}
    />
  )
}

export function MdxContent({ source }: MdxContentProps): JSX.Element {
  return <MDXRemote {...source} components={MdxComponents} />;
}