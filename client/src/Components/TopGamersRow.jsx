import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Media from 'react-media'
import { FaChevronRight } from 'react-icons/fa'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

// local imports
import Gamer from './Gamer'

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

const map = (gamers, first, setFirst) => {
  setFirst(first)
  return gamers.map((gamer, index) => {
    const favoriteGames = gamer.favoriteGames.map(game => game.name)
    return (
      index <= first - 1 && (
        <Gamer
          name={gamer.name}
          occupations={gamer.occupations}
          favoriteGames={favoriteGames}
          username={gamer.username}
          key={gamer.username}
        />
      )
    )
  })
}

const GET_GAMERS = gql`
  query($first: Int) {
    getGamers(first: $first) {
      name
      username
      occupations
      favoriteGames {
        name
      }
    }
    totalGamers
  }
`

export default function GamerRow(props) {
  const [first, setFirst] = useState(4)
  const { data, loading } = useQuery(GET_GAMERS, { variables: { first } })
  console.log(data)
  return (
    <Container>
      <RowTitle>{props.title}</RowTitle>
      {loading ? null : (
        <Fragment>
          <Media query={{ maxWidth: 969 }}>
            {matches =>
              matches && (
                <AllTheGamers>{map(data.getGamers, 4, setFirst)}</AllTheGamers>
              )
            }
          </Media>
          <Media query={{ minWidth: 970, maxWidth: 1239 }}>
            {matches =>
              matches && (
                <AllTheGamers>{map(data.getGamers, 6, setFirst)}</AllTheGamers>
              )
            }
          </Media>
          <Media query={{ minWidth: 1240, maxWidth: 1509 }}>
            {matches =>
              matches && (
                <AllTheGamers>{map(data.getGamers, 8, setFirst)}</AllTheGamers>
              )
            }
          </Media>
          <Media query={{ minWidth: 1510, maxWidth: 1779 }}>
            {matches =>
              matches && (
                <AllTheGamers>{map(data.getGamers, 5, setFirst)}</AllTheGamers>
              )
            }
          </Media>
          <Media query={{ minWidth: 1780 }}>
            {matches =>
              matches && (
                <AllTheGamers>{map(data.getGamers, 6, setFirst)}</AllTheGamers>
              )
            }
          </Media>
        </Fragment>
      )}
      {/* {first < data.getGamers.length && (
        <ShowAllContainer>
          <ShowAll to={`/gamers`}>
            {`Show All Gamers (${data.getGamers.length})`} <ShowAllRight />
          </ShowAll>
        </ShowAllContainer>
      )} */}
    </Container>
  )
}
