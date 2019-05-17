import { useRef, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'

export default function useQueryNotBugged(query, options) {
  const prevDataRef = useRef()
  const { loading, error, data, refetch } = useQuery(query, options)
  const hasData = data && Object.keys(data).length
  const activeData = hasData ? data : prevDataRef.current

  useEffect(() => {
    if (hasData) {
      prevDataRef.current = data
    }
  })

  return {
    data: activeData,
    refetch,
    loading,
    error,
  }
}
