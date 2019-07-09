import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

//local imports
import Game from './Game'

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
  font-size: 1.6rem;
  color: #db1422;
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
  color: #db1422;
  margin-left: 0.1rem;
`

const map = games => {
  return games.map(({ game }) => {
    return (
      <Game
        name={game.name}
        key={game.name}
        tags={game.tags}
        full
        picture={game.banner}
        numSessions={game.numSessions}
      />
    )
  })
}

export default function SearchPageGamesRow(props) {
  return (
    <Container>
      <AllTheGames>{map(props.games)}</AllTheGames>
      {/* <ShowAllContainer>
        {props.games.length > props.first && (
          <ShowAll to={`/search/games`}>
            {`Show All Games`} <ShowAllRight />
          </ShowAll>
        )}
      </ShowAllContainer> */}
    </Container>
  )
}
