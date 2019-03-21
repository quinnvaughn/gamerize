import React from 'react'
import dateFns from 'date-fns'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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
  background: #f10e0e;
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

const ADD_MINUTES_TO_SESSION = gql`
  mutation($input: AddMinutesToSessionInput!) {
    addMinutesToSession(input: $input) {
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
  return (
    <Container>
      <Title>Current Session:</Title>
      <Name>{currentSession.gamingSession.game.name}</Name>
      <Time>
        {dateFns.format(currentSession.startTime, dateFormat)}
        {` - `}
        {dateFns.format(currentSession.endTime, dateFormat)}
      </Time>
      <AddButton
        onClick={async () => {
          const input = { minutes: 5, sessionId: currentSession.id }
          await addMinutesToSession({ variables: { input } })
          refetch()
        }}
      >
        Add 5 minutes
      </AddButton>
      <AddButton
        onClick={async () => {
          const input = { minutes: 10, sessionId: currentSession.id }
          await addMinutesToSession({ variables: { input } })
          refetch()
        }}
      >
        Add 10 minutes
      </AddButton>
    </Container>
  )
}
