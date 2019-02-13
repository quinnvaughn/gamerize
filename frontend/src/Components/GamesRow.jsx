import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Game from './Game'

const RowTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  display: block;
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
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

//replace with actual data eventually
const games = [
  'Fortnite',
  'CS:GO',
  'Apex Legends',
  'Rocket League',
  'Anthem',
  'COD: Black Ops 4',
  'GTA V',
  'Dota 2',
  'League of Legends',
  'Rainbox Six Siege',
  'World of Warcraft',
  'PUBG',
  'FIFA 19',
  'Minecraft',
  'Super Smash Bros. Ultimate',
  'Overwatch',
  'Dead By Daylight',
]
// will do this different way with graphql but just to show 'Show All' do it this way for now.
const gamesLength = games.length

const mapSix = games => {
  return games.map((game, index) => {
    return index <= 5 && <Game name={game} />
  })
}

export default function GamesRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGames>{mapSix(games)}</AllTheGames>
      {gamesLength > 6 && (
        <ShowAll
          to={`/show-all/${props.title}`}
        >{`Show All Games (${gamesLength})`}</ShowAll>
      )}
    </Container>
  )
}
