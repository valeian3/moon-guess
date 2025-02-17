import { useNavigate } from 'react-router-dom'

import { useAuth, usePageTitle } from 'hooks/hooks'

import Leaderboard from 'components/Leaderboard'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  usePageTitle('Dashboard')

  const handleVote = () => {
    navigate('/vote')
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-start">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {`Welcome back ${user?.username} `}
        </h1>
      </div>

      <div className="mt-10 flex w-full justify-start">
        <button
          onClick={handleVote}
          className="rounded-lg bg-indigo-700 px-4 py-2 text-white transition-all duration-200 hover:bg-indigo-600 dark:hover:bg-indigo-800"
        >
          Vote
        </button>
      </div>
      <Leaderboard />
    </div>
  )
}

export default Dashboard
