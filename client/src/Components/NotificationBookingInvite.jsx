import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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

const Buttons = styled.div``

const Accept = styled.button`
  margin-right: 1rem;
  background: #f10e0e;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  position: relative;
`

const Decline = styled.button`
  background: #fff;
  padding: 1rem 1.4rem;
  color: #f10e0e;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  position: relative;
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

const ACCEPT_INVITE = gql`
  mutation($input: AcceptInviteInput!) {
    acceptInvite(input: $input) {
      accepted
    }
  }
`

const DECLINE_INVITE = gql`
  mutation($input: DeclineInviteInput!) {
    declineInvite(input: $input) {
      declined
    }
  }
`

export default function NotificationBookingInvite({
  notification,
  refetch,
  last,
}) {
  const text = notification.text
    .split(' ')
    .splice(1)
    .join(' ')
    .replace(/,/g, ' ')
  const username = notification.text.split(' ')[0]
  const acceptInvite = useMutation(ACCEPT_INVITE)
  const declineInvite = useMutation(DECLINE_INVITE)
  return (
    <Container last={last}>
      <TextContainer>
        <Text>
          <User to={`/users/${username}`}>{username}</User>
          {` ${text}`}
        </Text>
      </TextContainer>
      <Buttons>
        <Accept
          onClick={async () => {
            const input = { inviteId: notification.bookingInvite.id }
            const { data } = await acceptInvite({ variables: { input } })
            if (data.acceptInvite.accepted) {
              refetch()
            }
          }}
        >
          Accept
        </Accept>
        <Decline
          onClick={async () => {
            const input = { inviteId: notification.bookingInvite.id }
            const { data } = await declineInvite({ variables: { input } })
            if (data.declineInvite.declined) {
              refetch()
            }
          }}
        >
          Decline
        </Decline>
      </Buttons>
    </Container>
  )
}
