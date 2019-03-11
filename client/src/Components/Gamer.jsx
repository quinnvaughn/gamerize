import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'
import DynamicImage from './DynamicImage'
import { noSpaces } from '../utils/Strings'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  position: relative;
  :last-child {
    margin-right: 0;
  }
  @media (max-width: 969px) {
    width: 50% !important;
  }
  @media (max-width: 1239px) and (min-width: 970px) {
    width: 33.333% !important;
  }
  @media (max-width: 1779px) and (min-width: 1510px) {
    width: 20% !important;
  }
  @media (max-width: 1509px) and (min-width: 1240px) {
    width: 25% !important;
  }
  @media (min-width: 1780px) {
    width: 16.6667% !important;
  }
`

const Name = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  font-weight: 700;
  margin-top: 0.5rem;
`

const Occupation = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.3rem;
`

const FavoriteGames = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
`

const FavoriteGame = styled.span`
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
    color: #f10e0e;
    cursor: pointer;
  }
`

// pulled function out and named it to make it more obvious and clean up return
const formatCommas = (favoriteGames, game, index) => {
  if (index < favoriteGames.length - 1) {
    return <FavoriteGame key={game}>{`${game}, `}</FavoriteGame>
  } else {
    return <FavoriteGame key={game}>{`${game}`}</FavoriteGame>
  }
}

export default function Gamer(props) {
  return (
    <Container>
      <StyledLink to={`/users/${noSpaces(props.username)}`}>
        <DynamicImage src={DefaultAvatar} />
        <Name>{props.name}</Name>
        <Occupation>{props.occupation}</Occupation>
        <FavoriteGames>
          {`Favorite Games: `}
          {props.favoriteGames.map((game, index) =>
            formatCommas(props.favoriteGames, game, index)
          )}
        </FavoriteGames>
      </StyledLink>
    </Container>
  )
}
