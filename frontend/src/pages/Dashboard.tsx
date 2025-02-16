import { useAuth, usePageTitle } from 'hooks/hooks'

import Leaderboard from 'components/Leaderboard'

function Dashboard() {
  const { user } = useAuth()
  usePageTitle('Dashboard')

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-start">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {`Welcome back ${user?.username} `}
        </h1>
      </div>

      <section className="mt-8 w-full">
        <Leaderboard />
      </section>
    </div>
  )
}

export default Dashboard
