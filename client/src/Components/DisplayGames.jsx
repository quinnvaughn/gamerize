import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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
const GET_GAMES = gql`
  query($orderBy: String) {
    allGames(orderBy: $orderBy) {
      name
      tags
      numSessions
    }
  }
`

export default function DisplayGames(props) {
  const { data, loading } = useQuery(GET_GAMES, {
    variables: { orderBy: 'numSessions_DESC' },
  })
  return (
    <Container>
      <AllTheGames>
        {loading
          ? null
          : data.allGames.map(game => (
              <ExploreGame
                name={game.name}
                key={game.name}
                tags={game.tags}
                full
                numSessions={game.numSessions}
              />
            ))}
      </AllTheGames>
    </Container>
  )
}
