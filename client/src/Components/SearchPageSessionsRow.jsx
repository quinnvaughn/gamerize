import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import Session from './Session'

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const map = sessions => {
  return sessions.map(({ session }) => {
    return (
      <Session
        id={session.id}
        name={session.creator.displayName}
        game={session.game.name}
        username={session.creator.username}
        system={session.system}
        price={session.price}
        key={session.id}
        title={session.title}
        slotsAvailable={session.slotsAvailable}
        profilePicture={session.creator.profilePicture}
      />
    )
  })
}

export default function SearchPageSessionsRow(props) {
  return (
    <Container>
      <AllTheSessions>{map(props.sessions)}</AllTheSessions>
      {/* <ShowAllContainer>
        {props.sessions.length > props.first && (
          <ShowAll to={`/sessions`}>
            {`Show All Sessions`} <ShowAllRight />
          </ShowAll>
        )}
      </ShowAllContainer> */}
    </Container>
  )
}
