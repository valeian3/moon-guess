import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [theme] = useLocalStorage<string>('theme', 'dark')
  console.log('theme', theme)

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
        theme="light"
      />
    </Suspense>
  )
}

export default AppRoutes
