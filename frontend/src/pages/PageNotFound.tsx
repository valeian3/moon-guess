import { Link, useNavigate } from 'react-router-dom'

import { usePageTitle } from 'hooks/hooks'

import { ArrowLeft } from 'lucide-react'

export default function PageNotFound() {
  usePageTitle('Page Not Found')
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            We can’t find that page
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={handleGoBack}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} className="rounded-md" />

              <span>Go back</span>
            </button>

            <Link
              to="/"
              className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
