import { usePageTitle } from 'hooks/hooks'
import { Link } from 'react-router-dom'

function Public() {
  usePageTitle()
  return (
    <div className="flex w-full grow items-center justify-center bg-white dark:bg-slate-800">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Welcome to our community predictions
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Join us and make your predictions on future events!
        </p>
        <Link to="/register">
          <button className="focus:ring-opacity-50 mt-6 rounded-lg bg-indigo-700 px-6 py-3 text-white transition-all duration-200 hover:bg-indigo-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-indigo-800">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Public
