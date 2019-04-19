import React from 'react'
import styled from 'styled-components'

import Session from './Session'

const RowTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  width: 100%;
  display: block;
  cursor: default;
  padding-left: 0.8rem;
`

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

const AllTheSessions = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const map = (sessions, first, setFirst) => {
  return sessions.map((session, index) => {
    return (
      index <= first - 1 && (
        <Session
          id={session.id}
          name={session.creator.name}
          game={session.game.name}
          username={session.creator.username}
          system={session.system}
          price={session.price}
          key={session.id}
          title={session.title}
        />
      )
    )
  })
}

export default function TopSessionsRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheSessions>
        {map(props.data.allSessions, props.first)}
      </AllTheSessions>
    </Container>
  )
}
