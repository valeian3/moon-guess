import { Link, useNavigate } from 'react-router-dom'

import ThemeSelector from 'components/ThemeSelector'

import { useAuth } from 'hooks/hooks'

import { showToast } from 'utils/utils'

function Header() {
  const { signout } = useAuth()
  const navigate = useNavigate()

  const handleSignout = () => {
    signout().then(() => {
      showToast('success', 'Signed out successfully')
      navigate('/login')
    })
  }

  return (
    <>
      <header className="dark:bg-base-200 z-10 flex h-24 justify-center bg-white py-4 shadow-md md:px-6">
        <nav className="flex h-full w-4/5 max-w-[1200px] items-center justify-between gap-4">
          <Link
            to="/"
            className="tablet:text-3xl text-primary hover:bg-primary/10 text-xl"
          >
            <span>Crypto Predictions</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSelector />

            <button
              className="btn btn-outline btn-primary btn-md lg:btn-lg"
              onClick={handleSignout}
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
