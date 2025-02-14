import { Link, useNavigate } from 'react-router-dom'

import ThemeSelector from 'components/ThemeSelector'

import { useAuth } from 'hooks/hooks'

import { User, LogOut } from 'lucide-react'

function Header() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const handleOpenLoginPage = () => {
    navigate('/login')
  }

  const handleSignout = () => {
    signout().then(() => {
      navigate('/')
    })
  }

  return (
    <>
      <header className="z-10 h-24 bg-white px-6 py-4 shadow-md dark:bg-slate-800">
        <nav className="flex h-full items-center justify-between gap-4">
          <Link to="/" className="tablet:w-52 flex items-center">
            <p className="tablet:pb-0 tablet:text-3xl tablet:font-semibold text-2xl font-normal dark:text-gray-200">
              Crypto Predictions
            </p>
          </Link>
          <div className="ml-8 flex grow items-center gap-2 text-xl">
            {user && (
              <Link
                to="/dashboard"
                className="rounded-md text-gray-700 transition-all duration-200 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeSelector />

            {user ? (
              <LogOut
                onClick={handleSignout}
                size={40}
                className="hover:text-primary-500 tablet:block rounded-md p-2 text-orange-600 hover:bg-gray-300 dark:text-orange-400 dark:hover:bg-gray-600"
              />
            ) : (
              <User
                onClick={handleOpenLoginPage}
                size={40}
                className="hover:text-primary-500 tablet:block rounded-md p-2 text-gray-400 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600"
              />
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
