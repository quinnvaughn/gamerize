import React from 'react'
import styled from 'styled-components'

import Session from './Session'

const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`

export default function GamesRow(props) {
  return (
    <Row>
      {props.sessions.map(session => (
          <Session 
          username={session.creator.username} 
          game={props.name} 
          id={session.id}
          title={session.title} 
          name={session.creator.name} 
          system={session.system} 
          price={session.price} 
          reviews={session.reviewRating} 
          numReviews={session.numReviews}/>
      ))}
    </Row>
  )
}
