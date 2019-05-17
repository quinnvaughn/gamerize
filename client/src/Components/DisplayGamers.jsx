import React from 'react'
import styled from 'styled-components'

//local imports
import ExploreGamer from './ExploreGamer'

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

export default function DisplayGamers(props) {
  console.log(props.data.getGamers)
  return (
    <Container>
      <AllTheGames>
        {props.data.getGamers.map(gamer => (
          <ExploreGamer
            name={gamer.displayName}
            profilePicture={gamer.profilePicture}
            occupations={gamer.occupations}
            mostPlayedGames={gamer.mostPlayedGames}
            username={gamer.username}
            key={gamer.username}
          />
        ))}
      </AllTheGames>
    </Container>
  )
}
