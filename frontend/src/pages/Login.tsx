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
    <div className="bg-base-200 flex h-screen w-full flex-col items-center justify-center">
      <h2 className="text-base-content mt-6 text-center text-3xl font-extrabold">
        Sign in to your account
      </h2>
      <p className="text-base-content mt-2 text-center text-sm">
        {'Or '}
        <Link to="/register" className="link link-primary link-hover">
          create an account
        </Link>
      </p>

      <div className="bg-base-100 border-base-300 tablet:shadow-2xl tablet:rounded-md tablet:border-2 mt-8 w-full max-w-xl border-t-2 border-b-2 p-6">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username</legend>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input input-lg w-full transition-all duration-200 ${
                formik.touched.username && formik.errors.username
                  ? 'input-error'
                  : 'input-primary'
              } `}
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-error text-sm">{formik.errors.username}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input input-lg w-full transition-all duration-200 ${
                formik.touched.password && formik.errors.password
                  ? 'input-error'
                  : 'input-primary'
              } `}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-error text-sm">{formik.errors.password}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <div>
              <a className="link link-primary link-hover">Forgot password?</a>
            </div>
            <button
              className="btn btn-soft btn-block btn-primary btn-lg"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Login
