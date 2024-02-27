import axios, { RawAxiosRequestConfig } from 'axios'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.baseURL = 'https://us-central1-habit-tracker-b09af.cloudfunctions.net/api'

const useAxios = () => {
  const { currentUser } = useAuth()
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const request = async (params: RawAxiosRequestConfig) => {
    try {
      params.headers = {}
      params.headers.Authorization = `Bearer ${currentUser.uid}`
      const result = await axios.request(params)
      setResponse(result.data)
      return result.data
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { response, error, loading, request }
}

export default useAxios