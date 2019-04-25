import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'
import DynamicImage from './DynamicImage'
import { noSpaces, capitalize } from '../utils/Strings'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  position: relative;
  :last-child {
    margin-right: 0;
  }
  @media (max-width: 1127px) {
    width: 50% !important;
  }
  @media (min-width: 1128px) and (max-width: 1439px) {
    width: 25% !important;
  }
  @media (min-width: 1440px) {
    width: 20% !important;
  }
`

const Name = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  font-weight: 700;
  margin-top: 0.5rem;
`

const Occupations = styled.p`
  margin-bottom: 0.3rem;
`

const MostPlayedGames = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
`

const MostPlayedGame = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
`

const StyledLink = styled(Link)`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

const Occupation = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
`

// pulled function out and named it to make it more obvious and clean up return
const formatCommasGames = (mostPlayedGames, game, index) => {
  if (index < mostPlayedGames.length - 1) {
    return <MostPlayedGame key={game}>{`${game.name}, `}</MostPlayedGame>
  } else {
    return <MostPlayedGame key={game}>{`${game.name}`}</MostPlayedGame>
  }
}

const formatCommasOccupations = (occupations, occupation, index) => {
  if (index < occupations.length - 1) {
    return <Occupation key={occupation}>{`${occupation}, `}</Occupation>
  } else {
    return <Occupation key={occupation}>{`${occupation}`}</Occupation>
  }
}

export default function ExploreGamer(props) {
  return (
    <Container>
      <StyledLink to={`/users/${noSpaces(props.username)}`}>
        <DynamicImage src={DefaultAvatar} alt="Avatar" />
        <Name>{props.name}</Name>
        <Occupations>
          {props.occupations.map((occupation, index) =>
            formatCommasOccupations(
              props.occupations,
              capitalize(occupation),
              index
            )
          )}
        </Occupations>
        <MostPlayedGames>
          {`Most Played Games: `}
          {props.mostPlayedGames.map((game, index) =>
            formatCommasGames(props.mostPlayedGames, game, index)
          )}
        </MostPlayedGames>
      </StyledLink>
    </Container>
  )
}
