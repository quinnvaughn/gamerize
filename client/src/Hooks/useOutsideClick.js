import { useEffect, useRef } from 'react'

export default function useOutsideClick(onOutsideClick) {
  const node = useRef(null)
  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick, false)
    return () => {
      document.removeEventListener('mousedown', onOutsideClick, false)
    }
  }, [])
  return node
}
