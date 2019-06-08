import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import { capitalize } from '../utils/Strings'
import { displaySystem, mapLauncher, mapSystem } from '../utils/System'

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

const Buttons = styled.div`
  white-space: nowrap;
  text-align: center;
`

const Accept = styled.button`
  margin-right: 1rem;
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  position: relative;
  margin-bottom: 0.5rem;
`

const Decline = styled.button`
  background: #fff;
  padding: 1rem 1.4rem;
  color: #db1422;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #db1422;
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
    color: #db1422;
    text-decoration: underline;
  }
`

const CorrectGamertag = styled.div`
  word-wrap: break-word;
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
  gamertags,
}) {
  const text = notification.text
    .split(' ')
    .splice(1)
    .join(' ')
    .replace(/,/g, ' ')
  const username = notification.text.split(' ')[0]
  const acceptInvite = useMutation(ACCEPT_INVITE)
  const declineInvite = useMutation(DECLINE_INVITE)
  const noGamertags = gamertags === null ? true : false
  const {
    system,
    game,
  } = notification.bookingInvite.booking.timeslot.gamingSession
  const correctGamertags =
    gamertags && system === 'PC'
      ? gamertags && gamertags.pc[mapLauncher(game.launcher)] === null
        ? false
        : true
      : gamertags && gamertags[mapSystem(system)] === null
      ? false
      : true
  const disabled = noGamertags || !correctGamertags
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
          disabled={disabled}
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
        {disabled && (
          <CorrectGamertag>
            You must add a gamertag for{' '}
            {system === 'PC'
              ? `the ${capitalize(game.launcher)} Launcher`
              : displaySystem(system)}
          </CorrectGamertag>
        )}
      </Buttons>
    </Container>
  )
}
