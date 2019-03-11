import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Media from 'react-media'

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

const ShowAll = styled(Link)`
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
const gamesLength = games.length

const map = (games, display) => {
  return games.map((game, index) => {
    return (
      index <= display - 1 && (
        <Game
          name={game.name}
          key={game.name}
          tags={game.tags}
          full
          sessions={game.sessions}
        />
      )
    )
  })
}

export default function GamesRow(props) {
  const [displayed, setDisplayed] = useState(0)
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <Media query={{ maxWidth: 969 }}>
        {matches =>
          matches && <AllTheGames>{map(games, 4, setDisplayed)}</AllTheGames>
        }
      </Media>
      <Media query={{ minWidth: 970, maxWidth: 1239 }}>
        {matches =>
          matches && <AllTheGames>{map(games, 6, setDisplayed)}</AllTheGames>
        }
      </Media>
      <Media query={{ minWidth: 1240, maxWidth: 1509 }}>
        {matches =>
          matches && <AllTheGames>{map(games, 8, setDisplayed)}</AllTheGames>
        }
      </Media>
      <Media query={{ minWidth: 1510, maxWidth: 1779 }}>
        {matches =>
          matches && <AllTheGames>{map(games, 5, setDisplayed)}</AllTheGames>
        }
      </Media>
      <Media query={{ minWidth: 1780 }}>
        {matches =>
          matches && <AllTheGames>{map(games, 6, setDisplayed)}</AllTheGames>
        }
      </Media>
      {displayed < gamesLength && (
        <ShowAll to={`/games`}>{`Show All Games (${gamesLength})`}</ShowAll>
      )}
    </Container>
  )
}
