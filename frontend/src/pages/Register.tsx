import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth, usePageTitle } from 'hooks/hooks'

function Register() {
  usePageTitle('Register')
  const { register } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    register({ username: username, password: password })
      .then((res) => {
        if (res.status === 201) {
          setUsername('')
          setPassword('')
          navigate('/login', { replace: true })
        }
      })
      .catch((error) => {
        if (error.response.data.message.includes('Username')) {
          setError(error.response.data.message)
        } else {
          console.log(error.response.data.message)
        }
      })
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-white dark:bg-slate-800">
      <div className="flex flex-col items-center justify-center">
        <div className="tablet:shadow w-full rounded-lg bg-slate-100 sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-slate-700">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleRegister(e)
              }
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:text-gray-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                />
                {error && (
                  <p className="mt-2 ml-2 text-sm text-red-600">{error}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:text-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
