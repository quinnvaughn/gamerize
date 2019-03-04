import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'

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

const AvatarContainer = styled.div`
  width: 100%;
  padding-top: 66.6667%;
  position: relative;
  background-size: 100% 100%;
`

const AvatarSecond = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
`

const AvatarThird = styled.div`
  width: 100%;
  height: 100%;
  position: relative !important;
`

const Avatar = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
`

const Name = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  font-weight: 700;
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
    color: #e62739;
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
        <AvatarContainer>
          <AvatarSecond>
            <AvatarThird>
              <Avatar src={DefaultAvatar} />
            </AvatarThird>
          </AvatarSecond>
        </AvatarContainer>

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
