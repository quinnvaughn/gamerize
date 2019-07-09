import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DynamicImage from './DynamicImage'

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
  margin-top: 0.8rem;
`

const Username = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
`

const Name = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 0.2rem;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Gamer = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: #db1422;
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

export default function User(props) {
  return (
    <Container>
      <StyledLink to={`/users/${props.username}`}>
        <DynamicImage src={props.profilePicture} />
        <InfoContainer>
          <Username>{props.username}</Username>
          <Name>{props.name}</Name>
          {props.gamer && <Gamer>{`Gamer`}</Gamer>}
          {props.gamer && (
            <NumSessions>{`${props.numSessions} ${
              props.numSessions === 1 ? 'session' : 'sessions'
            }`}</NumSessions>
          )}
        </InfoContainer>
      </StyledLink>
    </Container>
  )
}
