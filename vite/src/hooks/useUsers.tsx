import { useCallback, useEffect, useState } from 'react'
import useAxios from './useAxios'

export default function useUsers() {
  const { request, response, loading } = useAxios()
  const [users, setUsers] = useState()

  const fetchUsers = useCallback(async (displayName) => {
    await request({
      method: 'get',
      url: displayName ? `/user/?displayName=${displayName}` : '/user',
    })
  }, [])

  useEffect(() => {
    if (!loading) setUsers(response)
  }, [loading, response])

  return { users, fetchUsers }
}
