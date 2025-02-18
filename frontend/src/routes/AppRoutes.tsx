import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { useLocalStorage } from 'hooks/hooks'

// layout
import Layout from 'layout/Layout'

// pages
const Dashboard = lazy(() => import('pages/Dashboard'))
const Vote = lazy(() => import('pages/Vote'))
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const PageNotFound = lazy(() => import('pages/PageNotFound'))

// component
import Loading from 'components/Loading'

function AppRoutes() {
  const [theme] = useLocalStorage<string>('theme', 'dark')

  useEffect(() => {
    document.querySelector('html')?.removeAttribute('data-theme')
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vote" element={<Vote />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
