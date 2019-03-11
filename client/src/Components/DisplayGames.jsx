import React from 'react'
import styled from 'styled-components'

//local imports
import Game from './Game'

//data
import games from '../data/games'

const RowTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  display: block;
`

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const AllTheGames = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.8rem;
  margin-right: -0.8rem;
`

//replace with actual data eventually

export default function DisplayGames(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGames>
        {games.map(game => (
          <Game
            name={game.name}
            key={game.name}
            tags={game.tags}
            full
            sessions={game.sessions}
          />
        ))}
      </AllTheGames>
    </Container>
  )
}
