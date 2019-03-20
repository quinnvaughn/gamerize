import React from 'react'
import dateFns from 'date-fns'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 2rem;
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  z-index: 0;
`

export default function SessionsIsGoingOn({ currentSession }) {
  const dateFormat = 'h:mm aa'
  return (
    <Container>
      <div>Current Session:</div>
      <div>{currentSession.gamingSession.game.name}</div>
      <div>
        {dateFns.format(currentSession.startTime, dateFormat)}-
        {dateFns.format(currentSession.endTime, dateFormat)}
      </div>
      <button>Add 5 minutes</button>
      <button>Add 10 minutes</button>
    </Container>
  )
}
