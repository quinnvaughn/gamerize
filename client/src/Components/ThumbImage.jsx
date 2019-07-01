import React, { useEffect, useState } from 'react'

export default function ThumbImage(props) {
  const [loading, setLoading] = useState(false)
  const [thumb, setThumb] = useState(null)
  useEffect(() => {
    if (!props.file) {
      return
    }
    setLoading(true)
    let reader = new FileReader()

    reader.onloadend = () => {
      setLoading(false)
      setThumb(reader.result)
    }

    reader.readAsDataURL(props.file)
  }, [props.file])
  if (!props.file) return null
  if (loading) return <p>Loading ...</p>
  return (
    <div>
      <img src={thumb} alt={props.file.name} height={200} width={200} />
    </div>
  )
}
