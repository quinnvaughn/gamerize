import React from 'react'
import styled from 'styled-components'

//local import
import ExploreSession from './ExploreSession'

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
  margin-left: -0.8rem;
  margin-right: -0.8rem;
`

export default function DisplaySessions(props) {
  return (
    <Container>
      <AllTheSessions>
        {props.data.allSessions.map(session => (
          <ExploreSession
            username={session.creator.username}
            game={session.game.name}
            id={session.id}
            title={session.title}
            slotsAvailable={session.slotsAvailable}
            name={session.creator.displayName}
            system={session.system}
            price={session.price}
            reviews={session.reviewRating}
            profilePicture={session.creator.profilePicture}
            numReviews={session.numReviews}
          />
        ))}
      </AllTheSessions>
    </Container>
  )
}
