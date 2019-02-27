import React from 'react'
import styled from 'styled-components'
import Gamer from './Gamer'
import { Link } from 'react-router-dom'

const RowTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  display: block;
  cursor: default;
`

const Container = styled.div`
  min-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

const AllTheGamers = styled.div`
  margin-top: 2rem;
  display: flex;
`

const ShowAll = styled(Link)`
  margin-top: 2rem;
  color: #e62739;
  font-size: 1.6rem;
  text-decoration: none;
  align-self: flex-start;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

//replace with actual data eventually
const gamers = [
  {
    name: 'Kyle',
    occupation: 'Rapper',
    favoriteGames: ['NBA 2K', 'GTA 5', 'Fortnite'],
    username: 'SuperDuperKyle',
  },
  {
    name: 'Taylor Bennett',
    occupation: 'Rapper',
    favoriteGames: ['NBA 2K', 'Apex Legends', 'Fortnite'],
    username: 'Taylor_Bennett',
  },
  {
    name: 'Shroud',
    occupation: 'Streamer',
    favoriteGames: ['RDR2', 'PUBG', 'Rocket League'],
    username: 'Shroud',
  },
  {
    name: 'Shroud',
    occupation: 'Streamer',
    favoriteGames: ['RDR2', 'PUBG', 'Rocket League'],
    username: 'Shroud',
  },
  {
    name: 'Ninja',
    occupation: 'Streamer',
    favoriteGames: ['Fortnite', 'PUBG', 'Rocket League'],
    username: 'Ninja',
  },
  {
    name: 'TimTheTatMan',
    occupation: 'Streamer',
    favoriteGames: ['RDR2', 'PUBG', 'Rocket League'],
    username: 'TimTheTatMan',
  },
  {
    name: 'Shroud',
    occupation: 'Streamer',
    favoriteGames: ['RDR2', 'PUBG', 'Rocket League'],
    username: 'shroud',
  },
  {
    name: 'TimTheTatMan',
    occupation: 'Streamer',
    favoriteGames: ['RDR2', 'PUBG', 'Rocket League'],
    username: 'TimTheTatMan',
  },
]
// will do this different way with graphql but just to show 'Show All' do it this way for now.
const gamersLength = gamers.length

const mapSix = gamers => {
  return gamers.map((gamer, index) => {
    return (
      index <= 5 && (
        <Gamer
          name={gamer.name}
          occupation={gamer.occupation}
          favoriteGames={gamer.favoriteGames}
          username={gamer.username}
          key={gamer.username}
        />
      )
    )
  })
}

export default function GamerRow(props) {
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <AllTheGamers>{mapSix(gamers)}</AllTheGamers>
      {gamersLength > 6 && (
        <ShowAll to={`/gamers`}>{`Show All Gamers (${gamersLength})`}</ShowAll>
      )}
    </Container>
  )
}
