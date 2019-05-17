import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

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

const ShowAllContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
`

const ShowAll = styled(Link)`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 1.6rem;
  color: #db1422;
  text-decoration: none;
  padding-left: 0.8rem;
  align-self: flex-start;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const ShowAllRight = styled(FaChevronRight)`
  width: 1rem;
  height: 1rem;
  color: #db1422;
  margin-left: 0.1rem;
`

const map = (sessions, first) => {
  return sessions.map((session, index) => {
    return (
      index <= first - 1 && (
        <Session
          id={session.id}
          name={session.creator.displayName}
          game={session.game.name}
          username={session.creator.username}
          system={session.system}
          price={session.price}
          key={session.id}
          title={session.title}
          profilePicture={session.creator.profilePicture}
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
      <ShowAllContainer>
        <ShowAll to={`/sessions`}>
          {`Show All Sessions (${props.data.totalSessions})`} <ShowAllRight />
        </ShowAll>
      </ShowAllContainer>
    </Container>
  )
}
