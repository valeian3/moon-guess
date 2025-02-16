import { useEffect, useState } from 'react'

import { votes } from 'services/api'
import { formatDate } from 'utils/utils'
import VoteForm from 'components/forms/VoteForm'

const Leaderboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localVotes, setLocalVotes] = useState<any[]>([])
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    // Set the due date for predictions (replace with actual due date)
    const dueDate = new Date('2025-06-16T00:00:00Z')
    const today = new Date()

    const differenceInTime = dueDate.getTime() - today.getTime()
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

    setDaysLeft(differenceInDays)

    votes.getVotes().then((res) => {
      setLocalVotes(res.data.votes)
    })
  }, [])

  return (
    <div className="mx-auto rounded-lg text-white">
      <VoteForm />
      <div className="flex w-full justify-between">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Predictions
        </h2>
        {daysLeft !== null && (
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Time Left:
            </span>
            <span className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100">
              {daysLeft} Days
            </span>
          </div>
        )}
      </div>

      <table className="w-full border-collapse border border-gray-300 dark:border-gray-500">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
              Analyst
            </th>
            <th className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
              Price (USD)
            </th>
            <th className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
              Voted at
            </th>
          </tr>
        </thead>
        <tbody>
          {localVotes.map((row) => (
            <tr
              key={row.username}
              className="border border-gray-300 text-center dark:border-gray-500"
            >
              <td className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
                {row.username}
              </td>
              <td className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
                {row.price}
              </td>
              <td className="border border-gray-300 p-2 text-gray-800 dark:border-gray-500 dark:text-gray-100">
                {formatDate(row.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        The table displays a comparison of analysts&apos; predicted Bitcoin
        (BTC) prices against the actual market price. It highlights each
        analyst&apos;s forecast and the difference between the two, with an
        indicator showing which analyst&apos;s prediction was closest to the
        actual price.
      </p>
    </div>
  )
}

export default Leaderboard
