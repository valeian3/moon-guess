import { useEffect, useState, useContext } from 'react'
import {
  useQuery,
  // UseQueryOptions,
  // UseQueryResult,
} from '@tanstack/react-query'

import { votesKeys } from 'services/query-key-factory'

import { votes } from 'services/api'

import { AuthContext, IVotesList } from 'types/types'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('auth context must be used within an AuthProvider')
  }
  return context
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error('Error reading localStorage key:', key, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error setting localStorage key:', key, error)
    }
  }

  return [storedValue, setValue] as const
}

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (!title) {
      window.document.title = 'Crypto Predictions'
    } else {
      window.document.title = title
    }
  }, [title])
}

export const useVotesList = () => {
  return useQuery<IVotesList>({
    queryKey: votesKeys.all,
    queryFn: () => votes.getVotesList(),
  })
}
