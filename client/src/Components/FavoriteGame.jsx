import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//local imports
import DynamicImage from './DynamicImage'
import DefaultGame from '../default-game.gif'
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
  @media (min-width: 970px) {
    width: 33.333% !important;
  }
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

const FavoriteGameTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 0.5rem;
  cursor: pointer;
`

export default function FavoriteGame(props) {
  return (
    <Container>
      <StyledLink to={`/games/${noSpaces(props.game)}`}>
        <DynamicImage src={DefaultGame} alt={props.game} />
        <FavoriteGameTitle>{props.game}</FavoriteGameTitle>
      </StyledLink>
    </Container>
  )
}
