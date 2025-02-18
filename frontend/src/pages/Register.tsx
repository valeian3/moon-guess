import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAuth, usePageTitle } from 'hooks/hooks'

import { showToast } from 'utils/utils'

function Register() {
  usePageTitle('Register')
  const { register } = useAuth()
  const navigate = useNavigate()

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
            showToast('success', 'Register successful')
            navigate('/login', { replace: true })
          }
        })
        .catch((error) => {
          showToast('error', 'Registration failed')
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
    <div className="dark:bg-base-100 flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="card bg-base-200 mt-8 w-full max-w-xl shrink-0 shadow-2xl sm:w-full">
        <div className="card-body">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Username</legend>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input md:input-md lg:input-lg w-full transition-all duration-200 ${
                  formik.touched.username && formik.errors.username
                    ? 'input-error'
                    : 'input-neutral'
                } `}
                placeholder="Enter your username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="fieldset-label text-error">
                  {formik.errors.username}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input md:input-md lg:input-lg w-full transition-all duration-200 ${
                  formik.touched.password && formik.errors.password
                    ? 'input-error'
                    : 'input-neutral'
                } `}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="fieldset-label text-error">
                  {formik.errors.password}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Confirm password</legend>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input md:input-md lg:input-lg w-full transition-all duration-200 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'input-error'
                    : 'input-neutral'
                } `}
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="fieldset-label text-error">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </fieldset>

            <fieldset className="fieldset">
              <button
                className="btn btn-soft btn-block btn-primary md:btn-md lg:btn-lg"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Create an account
              </button>
              <p className="text-base-content">
                Already have an account?{' '}
                <Link to="/login" className="link link-hover text-primary">
                  Login here
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
