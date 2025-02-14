import axios from 'axios'

import { urlParam } from 'constants/constants'

import type { ILoginUser, IRegisterUser } from 'types/types'

const BASE_URL = import.meta.env.VITE_APP_BACKEND_API

console.log(BASE_URL)

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
      const from = new URLSearchParams(location.search).get(
        urlParam.redirectFrom
      )

      if (error?.response?.status === 401) {
        if (!from)
          window.location.replace(
            `/login?${urlParam.redirectFrom}=${encodeURIComponent(window.location.pathname + window.location.search)}`
          )
      }
    }
    return Promise.reject(error)
  }
)

const userAuth = {
  async register(credentials: IRegisterUser) {
    return await apiInstance.post('/register', credentials)
  },
  async signin(credentials: ILoginUser) {
    return await apiInstance.post('/login', credentials)
  },
  async signout() {
    return await apiInstance.post('/logout')
  },
  async getUser() {
    return await apiInstance.get('/me')
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
  async getVotes() {
    return await apiInstance.get('/votes')
  },
  async sendVote(vote: { userId: string | undefined; price: number }) {
    return await apiInstance.post(`/vote`, vote)
  },
}

export { userAuth, users, votes }
