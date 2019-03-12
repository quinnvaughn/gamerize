import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Media from 'react-media'
import { FaChevronRight } from 'react-icons/fa'

// local imports
import Gamer from './Gamer'
import gamers from '../data/gamers'

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
  margin-bottom: 3rem;
`

const AllTheGamers = styled.div`
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
  padding-left: 0.8rem;
  color: #f10e0e;
  font-size: 1.6rem;
  text-decoration: none;
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

// will do this different way with graphql but just to show 'Show All' do it this way for now.
const gamersLength = gamers.length

const map = (gamers, display, setDisplayed) => {
  setDisplayed(display)
  return gamers.map((gamer, index) => {
    return (
      index <= display - 1 && (
        <Gamer
          name={gamer.name}
          occupations={gamer.occupations}
          favoriteGames={gamer.favoriteGames}
          username={gamer.username}
          key={gamer.username}
        />
      )
    )
  })
}

export default function GamerRow(props) {
  const [displayed, setDisplayed] = useState(0)
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      <Media query={{ maxWidth: 969 }}>
        {matches =>
          matches && <AllTheGamers>{map(gamers, 4, setDisplayed)}</AllTheGamers>
        }
      </Media>
      <Media query={{ minWidth: 970, maxWidth: 1239 }}>
        {matches =>
          matches && <AllTheGamers>{map(gamers, 6, setDisplayed)}</AllTheGamers>
        }
      </Media>
      <Media query={{ minWidth: 1240, maxWidth: 1509 }}>
        {matches =>
          matches && <AllTheGamers>{map(gamers, 8, setDisplayed)}</AllTheGamers>
        }
      </Media>
      <Media query={{ minWidth: 1510, maxWidth: 1779 }}>
        {matches =>
          matches && <AllTheGamers>{map(gamers, 5, setDisplayed)}</AllTheGamers>
        }
      </Media>
      <Media query={{ minWidth: 1780 }}>
        {matches =>
          matches && <AllTheGamers>{map(gamers, 6, setDisplayed)}</AllTheGamers>
        }
      </Media>
      {displayed < gamersLength && (
        <ShowAllContainer>
          <ShowAll to={`/gamers`}>
            {`Show All Gamers (${gamersLength})`} <ShowAllRight />
          </ShowAll>
        </ShowAllContainer>
      )}
    </Container>
  )
}
