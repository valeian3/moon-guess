import VoteForm from 'components/forms/VoteForm'

import { usePageTitle } from 'hooks/hooks'

function Vote() {
  usePageTitle('Vote')

  return (
    <div className="flex grow items-center justify-center">
      <VoteForm />
    </div>
  )
}

export default Vote
