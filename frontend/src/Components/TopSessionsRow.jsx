import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
`

const ShowAll = styled(Link)`
  margin-top: 2rem;
  font-size: 1.6rem;
  color: #e62739;
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const mapSix = (gamers, game) => {
  return gamers.map((gamer, index) => {
    return (
      index <= 5 && (
        <Session
          width="16.6666666667"
          name={gamer.name}
          game={game}
          username={gamer.username}
          gamerType={gamer.gamerType}
          systems={gamer.systems}
          price={gamer.price}
          reviews={gamer.reviews}
          numReviews={gamer.numReviews}
          key={gamer.name}
        />
      )
    )
  })
}

export default function TopSessionsRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGamers>{mapSix(props.gamers, props.game)}</AllTheGamers>
      {props.gamers.length > 6 && (
        <ShowAll
          to={`/gamers/${props.game}/${props.title}`}
        >{`Show All Gamers (${props.gamers.length})`}</ShowAll>
      )}
    </Container>
  )
}
