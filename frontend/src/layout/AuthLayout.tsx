import { useEffect, useState } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

import { useAuth } from 'hooks/hooks'

import { userAuth } from 'services/api'

export default function AuthLayout() {
  const { user, setUser } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)

    if (!user) {
      userAuth
        .getUser()
        .then((res) => {
          setUser(res.data.user)
        })
        .catch(() => {})
        .finally(() => {
          clearTimeout(timeout)
          setLoading(false)
        })
    } else {
      clearTimeout(timeout)
      setLoading(false)
    }

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="flex h-full min-h-screen items-center justify-center bg-white dark:bg-slate-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Checking if you&apos;re logged in...
          </p>
        </div>
      </div>
    )

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
