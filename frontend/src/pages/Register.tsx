import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth, usePageTitle } from 'hooks/hooks'

function Register() {
  usePageTitle('Register')
  const { register } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      const { username, password } = values
      register({
        username,
        password,
      })
        .then((res) => {
          if (res.status === 201) {
            navigate('/login', { replace: true })
          }
        })
        .catch((error) => {
          if (error.response?.data?.message.includes('Username')) {
            setFieldError('username', error.response.data.message)
          } else {
            console.error(error.response?.data?.message)
          }
        })
        .finally(() => setSubmitting(false))
    },
  })

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-white dark:bg-slate-800">
      <div className="flex flex-col items-center justify-center">
        <div className="tablet:shadow w-full rounded-lg bg-slate-100 sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-slate-700">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Username
                </label>
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

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'} // Toggle password visibility
                    autoComplete="new-password"
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
                  {/* Icon to toggle password visibility */}
                  <button
                    type="button"
                    className="absolute top-2.5 right-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm dark:text-gray-200 ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? 'border-red-500 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {/* Icon to toggle confirm password visibility */}
                  <button
                    type="button"
                    className="absolute top-2.5 right-3 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword state
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ${
                  formik.isSubmitting || !formik.isValid
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
                }`}
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
