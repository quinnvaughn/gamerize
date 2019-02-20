import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6666666666%;
`

const Avatar = styled.img`
  height: 100px;
  width: 100px;
`

const Name = styled.h4`
  font-size: 18px;
  margin-bottom: 3px;
`

const Occupation = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: black;
  margin-bottom: 3px;
`

const FavoriteGames = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: black;
`

const FavoriteGame = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: black;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    color: red;
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

const noSpaces = string => string.replace(/ /g, '_')

export default function Gamer(props) {
  return (
    <Container>
      <StyledLink to={`/users/${noSpaces(props.username)}`}>
        <Avatar src={DefaultAvatar} alt="Avatar" />
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