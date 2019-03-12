import React from 'react'
import styled from 'styled-components'

//local import
import ExploreGame from './ExploreGame'

//data
import games from '../data/games'

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
      <AllTheGames>
        {games.map(game => (
          <ExploreGame
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
