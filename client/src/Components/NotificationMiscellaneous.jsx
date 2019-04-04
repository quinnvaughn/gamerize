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
    color: #f10e0e;
    text-decoration: underline;
  }
`

const Close = styled(MdClose)`
  font-size: 1.6rem;
  color: black;
  margin-right: 4rem;
  :hover {
    color: #f10e0e;
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
  const text = notification.text
    .split(' ')
    .splice(1)
    .join(' ')
    .replace(/,/g, ' ')
  const username = notification.text.split(' ')[0]
  const deleteNotification = useMutation(DELETE_NOTIFICATION)
  return (
    <Container last={last}>
      <TextContainer>
        <Text>
          <User to={`/users/${username}`}>{username}</User>
          {` ${text}`}
        </Text>
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
