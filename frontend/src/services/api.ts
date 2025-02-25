import axios from 'axios'

import { URL_PARAM, NO_REDIRECT_ROUTES } from 'constants/constants'

import type { ILoginUser, IRegisterUser, IVotesList } from 'types/types'

const BASE_URL = import.meta.env.VITE_APP_BACKEND_API

if (!BASE_URL) {
  throw new Error('BASE_URL is not set in the environment variables')
}

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const currentPath = window.location.pathname
      const from = new URLSearchParams(location.search).get(
        URL_PARAM.redirectFrom
      )

      if (error?.response?.status === 401) {
        if (NO_REDIRECT_ROUTES.includes(currentPath))
          return Promise.reject(error)
        if (from)
          window.location.replace(
            `/login?${URL_PARAM.redirectFrom}=${encodeURIComponent(window.location.pathname + window.location.search)}`
          )
      }
    }
    return Promise.reject(error)
  }
)

const userAuth = {
  async register(credentials: IRegisterUser) {
    return await apiInstance.post('/auth/register', credentials)
  },
  async signin(credentials: ILoginUser) {
    return await apiInstance.post('/auth/login', credentials)
  },
  async signout() {
    return await apiInstance.post('/auth/logout')
  },
  async getUser() {
    return await apiInstance.get('/auth/user')
  },
}

const users = {
  async getUsers() {
    return await apiInstance.get('/users')
  },
  async getUser(id: string) {
    return await apiInstance.get(`/users/${id}`)
  },
}

const votes = {
  async getVotesList(): Promise<IVotesList> {
    try {
      const res = await apiInstance.get('/votes')
      return res.data.votes
    } catch (err) {
      console.error('Failed to fetch votes:', err)
      throw new Error('Unable to fetch votes.')
    }
  },
  async postVote(vote: { userId: string | undefined; price: number }) {
    return await apiInstance.post(`/votes`, vote)
  },
}

export { userAuth, users, votes }
