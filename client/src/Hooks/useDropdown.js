import { useState, useEffect } from 'react'

export default function useDropdown(ref) {
  const [dropdown, setDropdown] = useState(false)
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        setDropdown(true)
      } else {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref])
  return [dropdown, setDropdown]
}
