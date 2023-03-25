'use client'

import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>La page n&apos;existe page</h1>
    </div>
  )
}
