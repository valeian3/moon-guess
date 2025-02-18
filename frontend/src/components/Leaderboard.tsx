import { useVotesList } from 'hooks/hooks'
import { formatDate } from 'utils/utils'

const Leaderboard = () => {
  const { data, isLoading, error, isError } = useVotesList()

  if (isLoading)
    return (
      <div className="flex grow justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )

  if (isError || !data) {
    const errorMessage =
      error instanceof Error
        ? (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || error.message
        : 'An unknown error occurred.'
    return <span className="dark:text-info">{errorMessage}</span>
  }

  console.log(data)

  return (
    <div className="rounded-box border-base-content/5 bg-base-100 w-full overflow-x-auto border">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Analyst</th>
            <th>Price</th>
            <th>Voted at</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.votes.map((item: any, index: number) => (
            <tr key={item._id} className="hover:bg-base-300">
              <th>{index + 1}</th>
              <td>{item.username || 'Anonymous'}</td>
              <td>{item.price ?? 'N/A'}</td>
              <td>{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join flex w-full justify-end">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 22</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  )
}

export default Leaderboard
