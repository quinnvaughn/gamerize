import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Media from 'react-media'
import { FaChevronRight } from 'react-icons/fa'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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

//replace with actual data eventually
const games = [
  {
    name: 'Fortnite',
    tags: ['Shooter'],
    sessions: 500,
  },
  {
    name: 'Counter-Strike: Global Offensive',
    tags: ['FPS', 'Shooter'],
    sessions: 480,
  },
  {
    name: 'Apex Legends',
    tags: ['FPS', 'Shooter'],
    sessions: 475,
  },
  {
    name: 'Rocket League',
    tags: ['Action', 'Sports', 'Driving/Racing Game'],
    sessions: 460,
  },
  {
    name: 'Anthem',
    tags: ['Shooter'],
    sessions: 415,
  },
  {
    name: 'Call of Duty: Black Ops 4',
    tags: ['FPS', 'Shooter'],
    sessions: 400,
  },
  {
    name: 'Grand Theft Auto V',
    tags: ['Action', 'Adventure', 'Driving/Racing Game'],
    sessions: 385,
  },
  {
    name: 'DOTA 2',
    tags: ['MOBA'],
    sessions: 346,
  },
  {
    name: 'League of Legends',
    tags: ['MOBA'],
    sessions: 314,
  },
  {
    name: "Tom Clancy's Rainbow Six Siege",
    tags: ['FPS', 'Shooter'],
    sessions: 304,
  },
  {
    name: 'World of Warcraft',
    tags: ['MMORPG'],
    sessions: 300,
  },
  {
    name: "Player's Unknown Battleground",
    tags: ['FPS', 'Shooter'],
    sessions: 275,
  },
  {
    name: 'FIFA 19',
    tags: ['Sports'],
    sessions: 234,
  },
  {
    name: 'Minecraft',
    tags: ['Action', 'Adventure', 'Open World'],
    sessions: 200,
  },
  {
    name: 'Super Smash Bros. Ultimate',
    tags: ['Fighting', 'Platformer'],
    sessions: 175,
  },
  {
    name: 'Overwatch',
    tags: ['FPS', 'Shooter'],
    sessions: 150,
  },
  {
    name: 'Dead By Daylight',
    tags: ['Action', 'Horror'],
    sessions: 125,
  },
]
// will do this different way with graphql but just to show 'Show All' do it this way for now.

const map = (games, first, setFirst) => {
  setFirst(first)
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

const GET_GAMES = gql`
  query($first: Int, $orderBy: String) {
    allGames(first: $first, orderBy: $orderBy) {
      name
      tags
      numSessions
    }
  }
`

export default function GamesRow(props) {
  const [first, setFirst] = useState(4)
  const { data, loading } = useQuery(GET_GAMES, {
    variables: { first, orderBy: 'numSessions_DESC' },
  })
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      {loading ? null : (
        <Fragment>
          <Media query={{ maxWidth: 969 }}>
            {matches =>
              matches && (
                <AllTheGames>{map(data.allGames, 4, setFirst)}</AllTheGames>
              )
            }
          </Media>
          <Media query={{ minWidth: 970, maxWidth: 1239 }}>
            {matches =>
              matches && (
                <AllTheGames>{map(data.allGames, 6, setFirst)}</AllTheGames>
              )
            }
          </Media>
          <Media query={{ minWidth: 1240, maxWidth: 1509 }}>
            {matches =>
              matches && (
                <AllTheGames>{map(data.allGames, 8, setFirst)}</AllTheGames>
              )
            }
          </Media>
          <Media query={{ minWidth: 1510, maxWidth: 1779 }}>
            {matches =>
              matches && (
                <AllTheGames>{map(data.allGames, 5, setFirst)}</AllTheGames>
              )
            }
          </Media>
          <Media query={{ minWidth: 1780 }}>
            {matches =>
              matches && (
                <AllTheGames>{map(data.allGames, 6, setFirst)}</AllTheGames>
              )
            }
          </Media>{' '}
        </Fragment>
      )}
      {/* {displayed < gamesLength && (
        <ShowAllContainer>
          <ShowAll to={`/games`}>
            {`Show All Games (${gamesLength})`} <ShowAllRight />
          </ShowAll>
        </ShowAllContainer>
      )} */}
    </Container>
  )
}
