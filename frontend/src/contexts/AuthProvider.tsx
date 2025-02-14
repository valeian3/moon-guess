import { ReactNode, FC, useMemo, useState } from 'react'

import { userAuth } from 'services/api'

import {
  ILoginUser,
  IRegisterUser,
  AuthContext,
  AuthContextProps,
  IUserWithRoles,
} from 'types/types'

export const AuthProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<IUserWithRoles | null>(null)

  async function register(credentials: IRegisterUser) {
    return userAuth.register(credentials)
  }

  async function signin(credentials: ILoginUser) {
    return userAuth.signin(credentials)
  }

  async function signout() {
    return userAuth.signout().then(() => {
      setUser(null)
    })
  }

  async function getUser() {
    return userAuth.getUser()
  }

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      user,
      setUser,
      register,
      signin,
      signout,
      getUser,
    }),
    [user]
  )

  return <AuthContext value={contextValue}>{children}</AuthContext>
}
