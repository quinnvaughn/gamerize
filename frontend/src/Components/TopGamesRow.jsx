import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Game from './Game'

const RowTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  display: block;
  cursor: default;
`

const Container = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const AllTheGames = styled.div`
  margin-top: 20px;
  display: flex;
`

const ShowAll = styled(Link)`
  margin-top: 20px;
  color: red;
  text-decoration: none;
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
    name: 'CS:GO',
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

const mapSix = games => {
  return games.map((game, index) => {
    return (
      index <= 5 && (
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
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGames>{mapSix(games)}</AllTheGames>
      {gamesLength > 6 && (
        <ShowAll to={`/games`}>{`Show All Games (${gamesLength})`}</ShowAll>
      )}
    </Container>
  )
}
