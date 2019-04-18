import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

//local imports
import Game from './Game'

const RowTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  width: 100%;
  display: block;
  cursor: default;
  padding-left: 0.8rem;
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
`

const ShowAllContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
`

const ShowAll = styled(Link)`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  margin-top: 2rem;
  font-size: 1.6rem;
  color: #f10e0e;
  text-decoration: none;
  padding-left: 0.8rem;
  align-self: flex-start;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const ShowAllRight = styled(FaChevronRight)`
  width: 1rem;
  height: 1rem;
  color: #f10e0e;
  margin-left: 0.1rem;
`

const map = (games, first) => {
  return games.map((game, index) => {
    return (
      index <= first - 1 && (
        <Game
          name={game.name}
          key={game.name}
          tags={game.tags}
          full
          numSessions={game.numSessions}
        />
      )
    )
  })
}

export default function GamesRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGames>{map(props.data.allGames, props.first)}</AllTheGames>
      {props.first < props.data.totalGames && (
        <ShowAllContainer>
          <ShowAll to={`/games`}>
            {`Show All Games (${props.data.totalGames})`} <ShowAllRight />
          </ShowAll>
        </ShowAllContainer>
      )}
    </Container>
  )
}
