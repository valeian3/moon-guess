import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useAuth, usePageTitle } from 'hooks/hooks'

function Login() {
  usePageTitle('Login')
  const { signin, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from: string = location.state?.from?.pathname || '/dashboard'

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    signin({ username: username, password: password }).then((res) => {
      setUser(res.data.user)
      navigate(from, { replace: true })
    })
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-white dark:bg-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
          Sign in to your account
        </h2>
        <p className="max-w mt-2 text-center text-sm text-gray-600">
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
          <form
            className="space-y-6"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
          >
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
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:text-gray-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                />
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
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:text-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
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
