import { useAuth, usePageTitle } from 'hooks/hooks'

import Leaderboard from 'components/Leaderboard'

function Dashboard() {
  const { user } = useAuth()
  usePageTitle('Dashboard')

  return (
    <div className="flex max-h-[calc(100vh-96px)] w-full flex-col items-center">
      <div className="max-w-6xl">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {`Welcome back ${user?.username} `}
        </h1>
        <section className="mt-8 w-full">
          <Leaderboard />
        </section>
      </div>
    </div>
  )
}

export default Dashboard
