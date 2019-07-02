import { useEffect } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const VIEW_GAMING_SESSION = gql`
  mutation($input: ViewGamingSessionInput!) {
    viewGamingSession(input: $input) {
      viewed
    }
  }
`

export default function useViewGamingSession(gamingSessionId) {
  const viewGamingSession = useMutation(VIEW_GAMING_SESSION)
  useEffect(() => {
    async function viewSession() {
      await viewGamingSession({ variables: { input: { gamingSessionId } } })
    }
    viewSession()
  }, {})
}
