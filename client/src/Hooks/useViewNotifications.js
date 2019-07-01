import { useEffect } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const VIEW_NOTIFICATIONS = gql`
  mutation {
    viewUserNotifications {
      viewed
    }
  }
`

export default function useViewNotifications() {
  const viewUserNotifications = useMutation(VIEW_NOTIFICATIONS)
  useEffect(() => {
    async function notifications() {
      await viewUserNotifications()
    }
    notifications()
  }, {})
}
