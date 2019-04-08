import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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

const GET_GAMERS = gql`
  {
    getGamers {
      name
      username
      mostPlayedGames {
        name
      }
      occupations {
        name
      }
    }
    totalGamers
  }
`

export default function DisplayGamers(props) {
  const { data, loading } = useQuery(GET_GAMERS)
  return (
    <Container>
      <AllTheGames>
        {loading
          ? null
          : data.getGamers.map(gamer => (
              <ExploreGamer
                name={gamer.name}
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
