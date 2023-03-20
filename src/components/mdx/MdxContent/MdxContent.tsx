'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { lioshi } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from '../Button';

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
}

SyntaxHighlighter.registerLanguage('javascript', js);

const MdxComponents = {
   /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h1 style={{ color: '#FFF676' }} {...props} />
  ),

  /** Button */
  Button: (props: React.HTMLProps<HTMLButtonElement>): JSX.Element => (
    <Button { ...props } />
  ),

  /** SyntaxHighlighter */
  SyntaxHighlighter: (props: any): JSX.Element => (
    <SyntaxHighlighter language="javascript" style={vs} {...props} />
  )
}

export function MdxContent({ source }: MdxContentProps): JSX.Element {
  return <MDXRemote {...source} components={MdxComponents} />;
}