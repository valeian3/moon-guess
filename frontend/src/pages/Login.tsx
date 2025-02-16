import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAuth, usePageTitle } from 'hooks/hooks'

import { showToast } from 'utils/utils'

function Login() {
  usePageTitle('Login')
  const { signin, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from: string = location.state?.from?.pathname || '/'

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      signin(values)
        .then((res) => {
          setUser(res.data.user)
          showToast('success', 'Login successful!')
          navigate(from, { replace: true })
        })
        .catch((err) => {
          showToast('error', err.response?.data?.message || 'Login failed')
        })
        .finally(() => setSubmitting(false))
    },
  })

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-white dark:bg-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {'Or '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="tablet:shadow bg-slate-100 px-4 py-8 sm:rounded-lg sm:px-10 dark:bg-slate-700">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm dark:text-gray-200 ${
                    formik.touched.username && formik.errors.username
                      ? 'border-red-500 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400'
                  }`}
                  placeholder="Enter your username"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.username}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm dark:text-gray-200 ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400'
                  }`}
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-200 ${
                  formik.isSubmitting || !formik.isValid
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
                }`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
