import React from 'react'
import styled from 'styled-components'
import SearchPageGamesRow from './SearchPageGamesRow'

const Container = styled.div`
  width: 100%;
`

const Title = styled.h1`
  font-size: 3.4rem;
  margin-left: 0.8rem;
`

export default function SearchPageGames(props) {
  return props.games && props.games.length > 0 ? (
    <Container>
      <Title>Games</Title>
      <SearchPageGamesRow games={props.games} first={10} />
    </Container>
  ) : null
}
