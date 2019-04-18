import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//local imports
import DefaultGame from '../default-game.gif'
import { noSpaces } from '../utils/Strings'

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

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`

const Price = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
`

const Gamers = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  cursor: pointer;
`

const Gamer = styled.div`
  color: black;
  display: inline-block;
  border-radius: 4px;
  margin-right: 0.8rem;
  cursor: pointer;
`

export default function SearchResultSession(props) {
  return (
    <Container
      to={`/users/${props.creator.username}/${noSpaces(props.game.name)}/${
        props.id
      }`}
    >
      <PictureContainer>
        <Image src={DefaultGame} alt="session" />
      </PictureContainer>
      <InfoContainer>
        <Title>{props.title}</Title>
        <Gamers>
          {props.gamers.map(gamer => (
            <Gamer>{gamer.username}</Gamer>
          ))}
        </Gamers>
        <Price>{`$${props.price}`}</Price>
      </InfoContainer>
    </Container>
  )
}
