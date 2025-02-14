import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useLocalStorage } from 'hooks/hooks'

// layout
import Layout from 'layout/Layout'
import AuthLayout from 'layout/AuthLayout'

// Private pages
const Dashboard = lazy(() => import('pages/Dashboard'))

// Public pages
const Public = lazy(() => import('pages/Public'))
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
        {/* Public routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Public />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
