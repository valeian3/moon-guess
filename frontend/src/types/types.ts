import { createContext } from 'react'
import { AxiosResponse } from 'axios'

type Role = 'admin' | 'operator' | 'reader'
export interface IUser {
  id?: string
  username: string
  email: string
  password: string
  role?: Role[]
}

export type ILoginUser = Omit<IUser, 'id' | 'email' | 'roles'>
export type IRegisterUser = Omit<IUser, 'id' | 'email' | 'roles'>
export type IUserResponseMe = Omit<IUser, 'email' | 'password'>
export type IUserWithRoles = Omit<IUser, 'email' | 'password'>

export interface AuthContextProps {
  user: IUserWithRoles | null
  setUser: (value: IUserWithRoles | null) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (credentials: IRegisterUser) => Promise<AxiosResponse<any, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signin: (credentials: ILoginUser) => Promise<AxiosResponse<any, any>>
  signout: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUser: () => Promise<AxiosResponse<any, any>>
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)
export const QueryContext = createContext<undefined>(undefined)

export interface IVotesList {
  username: string
}
