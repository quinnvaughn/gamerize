import { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'

export default function useQueryNotBugged(...args) {
  const [notNullData, setNotNullData] = useState()
  const { data, error, loading, fetchMore } = useQuery(...args)

  useEffect(() => {
    if (!data) {
      setNotNullData()
    }
    if (data && !loading) {
      setNotNullData(data)
    }
  }, [data])
  return { data: notNullData, error, loading, fetchMore }
}
