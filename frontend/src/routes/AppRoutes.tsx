import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useLocalStorage } from 'hooks/hooks'

// layout
import Layout from 'layout/Layout'

// pages
const Dashboard = lazy(() => import('pages/Dashboard'))
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const PageNotFound = lazy(() => import('pages/PageNotFound'))

// component
import Loading from 'components/Loading'

function AppRoutes() {
  const [, setTheme] = useLocalStorage<string>('theme', 'dark')

  useEffect(() => {
    document.documentElement.classList.add('dark')
    setTheme('dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
