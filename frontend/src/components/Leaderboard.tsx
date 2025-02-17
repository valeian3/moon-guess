import { useVotesList } from 'hooks/hooks'

const Leaderboard = () => {
  const { data, isLoading, error, isError } = useVotesList()

  if (isLoading)
    return <span className="dark:text-white">fetching product data...</span>

  const errorMessage =
    error instanceof Error
      ? (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || error.message
      : 'An unknown error occurred.'

  if (isError || !data) {
    return <span className="dark:text-white">{errorMessage}</span>
  }

  console.log(data)

  return <div className="mx-auto rounded-lg text-white"></div>
}

export default Leaderboard
