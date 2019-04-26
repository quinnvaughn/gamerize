import React from 'react'
import styled from 'styled-components'

//local import
import ExploreGame from './ExploreGame'

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

export default function DisplayGames(props) {
  return (
    <Container>
      <AllTheGames>
        {props.data.allGames.map(game => (
          <ExploreGame
            name={game.name}
            key={game.name}
            picture={game.picture}
            tags={game.tags}
            full
            numSessions={game.numSessions}
          />
        ))}
      </AllTheGames>
    </Container>
  )
}
