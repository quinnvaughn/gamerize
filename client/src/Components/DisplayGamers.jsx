import React from 'react'
import styled from 'styled-components'

//local imports
import ExploreGamer from './ExploreGamer'

//data
import gamers from '../data/gamers'

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
        {gamers.map(gamer => (
          <ExploreGamer
            name={gamer.name}
            occupations={gamer.occupations}
            favoriteGames={gamer.favoriteGames}
            username={gamer.username}
            key={gamer.username}
          />
        ))}
      </AllTheGames>
    </Container>
  )
}
