import { useNavigate } from 'react-router-dom'

import { useAuth, usePageTitle } from 'hooks/hooks'

import PredictionsTable from 'components/tables/PredictionsTable'

import { CircleUserRound } from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  usePageTitle('Dashboard')

  const handleVote = () => {
    navigate('/vote')
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex w-full justify-start">
        <div className="alert alert-info alert-soft">
          <CircleUserRound />
          <span className="text-lg font-medium">
            {`Welcome back, ${user?.username}!`}
          </span>
        </div>
      </div>

      <div className="mt-10 mb-4 flex w-full justify-start">
        <button
          className="btn btn-soft btn-primary md:btn-md lg:btn-lg"
          onClick={handleVote}
        >
          Vote
        </button>
      </div>
      <PredictionsTable />
    </div>
  )
}

export default Dashboard
