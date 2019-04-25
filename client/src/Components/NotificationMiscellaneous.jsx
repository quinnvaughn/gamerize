import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const Container = styled.div`
  padding: 2rem 0;
  border-bottom: ${props => (props.last ? 'none' : '1px solid #ebebeb')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TextContainer = styled.div``

const Text = styled.div`
  font-size: 1.6rem;
`

const User = styled(Link)`
  display: inline;
  color: black;
  font-size: 1.6rem;
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: #db1422;
    text-decoration: underline;
  }
`

const EditProfile = styled(Link)`
  display: inline;
  color: black;
  font-size: 1.6rem;
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: #db1422;
    text-decoration: underline;
  }
`

const Close = styled(MdClose)`
  font-size: 1.6rem;
  color: black;
  margin-right: 4rem;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

const DELETE_NOTIFICATION = gql`
  mutation($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      deleted
    }
  }
`

export default function NotificationMiscellaneous({
  notification,
  last,
  refetch,
}) {
  const text =
    notification.type !==
      ('ACCEPTED_GAMER_REQUEST' || 'DENIED_GAMER_REQUEST') &&
    notification.text
      .split(' ')
      .splice(1)
      .join(' ')
      .replace(/,/g, ' ')
  const acceptedGamerRequestText = notification.text.split('.').splice(0, 1)
  const acceptedGamerLink = notification.text.split('.').splice(1, 1)
  const username = notification.text.split(' ')[0]
  const deleteNotification = useMutation(DELETE_NOTIFICATION)
  return (
    <Container last={last}>
      <TextContainer>
        {notification.type === 'ACCEPTED_GAMER_REQUEST' ? (
          <Text>
            {`${acceptedGamerRequestText}. `}
            <EditProfile to="/gamer-dashboard/sessions/active">
              {`${acceptedGamerLink}.`}
            </EditProfile>
          </Text>
        ) : notification.type === 'DENIED_GAMER_REQUEST' ? (
          <Text>{notification.text}</Text>
        ) : (
          <Text>
            <User to={`/users/${username}`}>{username}</User>
            {` ${text}`}
          </Text>
        )}
      </TextContainer>
      <Close
        onClick={async () => {
          const input = { notificationId: notification.id }
          const { data } = await deleteNotification({ variables: { input } })
          if (data.deleteNotification.deleted) {
            refetch()
          }
        }}
      />
    </Container>
  )
}
