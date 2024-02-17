import { formatISO, getHours, getMinutes, getSeconds, setHours, setMinutes, setSeconds } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'
import useAxios from './useAxios'

export default function useCheckIns({ habitId, completionsPerDay }) {
  const checkInAxios = useAxios()
  const checkInsAxios = useAxios()
  const [state, setState] = useState()
  const changed = useRef(false)
  const stateRef = useRef()
  stateRef.current = state

  const post = useCallback(async () => {
    await checkInAxios.request({
      method: 'post',
      url: `/habit/${habitId}/check-in`,
      data: stateRef.current
    })
  }, [])

  const fetch = useCallback(async () => {
    const res = await checkInsAxios.request({
      method: 'get',
      url: `/habit/${habitId}/check-in`
    })
    const checkIns = {}
    res.forEach(datetime => {
      const date = formatISO(datetime, { representation: 'date' })
      if (date in checkIns) checkIns[date].push(datetime)
      else checkIns[date] = [datetime]
    })
    setState(checkIns)
  }, [])

  const add = (datetime) => {
    const now = new Date()
    datetime = setSeconds(datetime, getSeconds(now))
    datetime = setMinutes(datetime, getMinutes(now))
    datetime = setHours(datetime, getHours(now))
    setState(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const date = formatISO(datetime, { representation: 'date' })
      if (date in next) {
        if (next[date].length < completionsPerDay) next[date].push(datetime)
        else next[date] = []
      } else next[date] = [datetime]
      changed.current = true
      return next
    })
  }

  const has = (datetime) => {
    const date = formatISO(datetime, { representation: 'date' })
    return state[date] !== undefined && state[date].length > 0
  }

  useEffect(() => {
    fetch()
    return () => {
      if (changed.current) post()
    }
  }, [])

  return { state, fetch, post, add, has }
}
