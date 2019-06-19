import React from 'react'
import dateFns from 'date-fns'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import { mapSystem, mapLauncher } from '../utils/System'

const Container = styled.div`
  margin-bottom: 1rem;
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  z-index: 0;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Name = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Time = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`

const AddButton = styled.button`
  border: 0;
  cursor: pointer;
  outline: 0;
  background: #db1422;
  color: #fff;
  border-radius: 4px;
  margin-right: 0.5rem;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  :last-of-type {
    margin-right: 0;
  }
`

const Content = styled.div`
  display: flex;
`
const Flex70 = styled.div`
  flex: 70%;
`

const Flex30 = styled.div`
  flex: 30%;
`

const Usernames = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`

const Username = styled.div`
  font-size: 1.6rem;
`

const ADD_MINUTES_TO_SESSION = gql`
  mutation($input: AddMinutesToTimeSlotInput!) {
    addMinutesToTimeSlot(input: $input) {
      updatedSession {
        startTime
        endTime
      }
    }
  }
`

export default function SessionsIsGoingOn({ currentSession, refetch }) {
  const dateFormat = 'h:mm aa'
  const addMinutesToSession = useMutation(ADD_MINUTES_TO_SESSION)
  const renderUsernames = () => {
    let usernames = new Set()
    let counter = 0
    let end = currentSession.slots
    const system = mapSystem(currentSession.gamingSession.system)
    const launcher = mapLauncher(
      currentSession.gamingSession.launcher
        ? currentSession.gamingSession.launcher
        : ''
    )
    while (counter < end) {
      if (system === 'pc') {
        let username =
          currentSession.players.length > 0 && currentSession.players[counter]
            ? currentSession.players[counter].player.gamertags[system][launcher]
            : null
        usernames.add(username)
      } else {
        let username =
          currentSession.players.length > 0 && currentSession.players[counter]
            ? currentSession.players[counter].player.gamertags[system]
            : null
        usernames.add(username)
      }
      counter++
    }
    const uniqueUsernames = [...usernames]
    return (
      <Flex30>
        <Usernames>Usernames:</Usernames>
        {uniqueUsernames.map(username => (
          <Username>{username}</Username>
        ))}
      </Flex30>
    )
  }
  return (
    <Container>
      <Content>
        <Flex70>
          <Title>Current Session:</Title>
          <Name>{currentSession.gamingSession.game.name}</Name>
          <Time>
            {dateFns.format(currentSession.startTime, dateFormat)}
            {` - `}
            {dateFns.format(currentSession.endTime, dateFormat)}
          </Time>
          <AddButton
            onClick={async () => {
              const input = {
                minutes: 1,
                sessionId: currentSession.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }
              await addMinutesToSession({ variables: { input } })
              refetch()
            }}
          >
            Add 1 minute
          </AddButton>
          <AddButton
            onClick={async () => {
              const input = {
                minutes: 5,
                sessionId: currentSession.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }
              await addMinutesToSession({ variables: { input } })
              refetch()
            }}
          >
            Add 5 minutes
          </AddButton>
          <AddButton
            onClick={async () => {
              const input = {
                minutes: 10,
                sessionId: currentSession.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }
              await addMinutesToSession({ variables: { input } })
              refetch()
            }}
          >
            Add 10 minutes
          </AddButton>
        </Flex70>
        {renderUsernames()}
      </Content>
    </Container>
  )
}
