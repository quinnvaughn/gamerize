import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//local imports
import DefaultGame from '../default-game.gif'
import { capitalize, noSpaces } from '../utils/Strings'

const Container = styled(Link)`
  padding: 1.6rem 2.4rem;
  padding-left: 3.2rem;
  display: flex;
  color: black;
  text-decoration: none;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
`

const PictureContainer = styled.div`
  height: 5rem;
  width: 5rem;
  margin-right: 1rem;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  cursor: pointer;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const Game = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`

const Tags = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-top: 0.5rem;
  cursor: pointer;
`

const Tag = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
  border: 1px solid #dddfe2;
  padding: 0.4rem 0.6rem;
  display: inline-block;
  border-radius: 4px;
  margin-right: 0.8rem;
  cursor: pointer;
`

export default function SearchResultGame(props) {
  return (
    <Container to={`/games/${noSpaces(props.game)}`}>
      <PictureContainer>
        <Image src={DefaultGame} alt="Game" />
      </PictureContainer>
      <InfoContainer>
        <Game>{props.game}</Game>
        <Tags>
          {props.tags.map(tag => (
            <Tag>{capitalize(tag)}</Tag>
          ))}
        </Tags>
      </InfoContainer>
    </Container>
  )
}
