import { useEffect, useState } from 'react'

/* Remembers which photo files exist in /public so placeholders swap to real images automatically. */
const cache = new Map()

export function useImage(src) {
  const [, rerender] = useState(0)
  useEffect(() => {
    if (!src || cache.has(src)) return
    let alive = true
    const img = new Image()
    img.onload = () => {
      cache.set(src, true)
      if (alive) rerender((n) => n + 1)
    }
    img.onerror = () => cache.set(src, false)
    img.src = src
    return () => {
      alive = false
    }
  }, [src])
  return cache.get(src) === true
}
