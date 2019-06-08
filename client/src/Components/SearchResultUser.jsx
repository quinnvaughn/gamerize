import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  height: 100%;
  cursor: pointer;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const Username = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`

const Name = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 0.2rem;
  cursor: pointer;
`

const Gamer = styled.span`
  font-size: 1.4rem;
  color: #db1422;
  margin-left: 0.5rem;
  cursor: pointer;
`

const Top = styled.div`
  margin-bottom: 0.2rem;
  cursor: pointer;
`

const NumSessions = styled.div`
  color: #db1422;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
`

export default function SearchResultUser(props) {
  return (
    <Container to={`/users/${props.username}`}>
      <PictureContainer>
        <Image src={props.profilePicture} alt="User" />
      </PictureContainer>
      <InfoContainer>
        <Top>
          <Username>{props.username}</Username>
          {props.gamer && <Gamer>{`Gamer`}</Gamer>}
        </Top>
        <Name>{props.name}</Name>
        {props.gamer && (
          <NumSessions>{`${props.numSessions} ${
            props.numSessions === 1 ? 'session' : 'sessions'
          }`}</NumSessions>
        )}
      </InfoContainer>
    </Container>
  )
}
