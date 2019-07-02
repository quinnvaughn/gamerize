import { useEffect } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const VIEW_PROFILE = gql`
  mutation($input: ViewUserProfileInput!) {
    viewUserProfile(input: $input) {
      viewed
    }
  }
`

export default function useViewProfile(username) {
  const viewUserProfile = useMutation(VIEW_PROFILE)
  useEffect(() => {
    async function viewProfile() {
      await viewUserProfile({ variables: { input: { username } } })
    }
    viewProfile()
  }, {})
}
