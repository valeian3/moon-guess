import { Link, useNavigate } from 'react-router-dom'

import ThemeSelector from 'components/ThemeSelector'

import { useAuth } from 'hooks/hooks'

function Header() {
  const { signout } = useAuth()
  const navigate = useNavigate()

  const handleSignout = () => {
    signout().then(() => {
      navigate('/login')
    })
  }

  return (
    <>
      <header className="z-10 flex h-24 justify-center bg-white px-6 py-4 shadow-md dark:bg-slate-800">
        <nav className="flex h-full w-4/5 max-w-[1200px] items-center justify-between gap-4">
          <Link to="/" className="tablet:w-52 flex items-center">
            <p className="tablet:pb-0 tablet:text-3xl tablet:font-semibold text-2xl font-normal dark:text-gray-200">
              Crypto Predictions
            </p>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSelector />

            <button
              type="button"
              onClick={handleSignout}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-lg font-bold text-gray-900 transition-all duration-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Log out
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
