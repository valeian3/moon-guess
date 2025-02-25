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
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
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
    <div className="bg-base-200 flex h-screen w-full flex-col items-center justify-center">
      <div className="bg-base-100 border-base-300 tablet:shadow-2xl tablet:rounded-md tablet:border-2 mt-8 w-full max-w-xl border-t-2 border-b-2 p-6">
        <h2 className="text-base-content text-center text-3xl font-extrabold">
          Create an account
        </h2>
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
              className={`input tablet:input-lg w-full transition-all duration-200 ${
                formik.touched.username && formik.errors.username
                  ? 'input-error'
                  : 'input-primary'
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
            <legend className="fieldset-legend">Email</legend>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input tablet:input-lg w-full transition-all duration-200 ${
                formik.touched.email && formik.errors.email
                  ? 'input-error'
                  : 'input-primary'
              } `}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="fieldset-label text-error">{formik.errors.email}</p>
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
              className={`input tablet:input-lg w-full transition-all duration-200 ${
                formik.touched.password && formik.errors.password
                  ? 'input-error'
                  : 'input-primary'
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
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input tablet:input-lg w-full transition-all duration-200 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'input-error'
                  : 'input-primary'
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
              className="btn btn-soft btn-block btn-primary btn-lg"
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
  )
}

export default Register
