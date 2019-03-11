import React from 'react'
import styled from 'styled-components'
import Session from './Session'

const RowTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
  width: 100%;
  display: block;
`

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

const AllTheGamers = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`

export default function TopSessionsRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGamers>
        {props.gamers.map(gamer => (
          <Session
            name={gamer.name}
            game={props.game}
            username={gamer.username}
            systems={gamer.systems}
            price={gamer.price}
            reviews={gamer.reviews}
            numReviews={gamer.numReviews}
            key={gamer.name}
            title={gamer.title}
          />
        ))}
      </AllTheGamers>
    </Container>
  )
}
