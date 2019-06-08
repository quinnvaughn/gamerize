import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { noSpaces } from '../utils/Strings'
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

const Name = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
`

const Sessions = styled.p`
  font-size: 1.6rem;
  color: black;
`

const StyledLink = styled(Link)`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  text-decoration: none;
  color: black;
  font-size: 1.6rem;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

export default function Game(props) {
  return (
    <Container>
      <StyledLink
        to={{
          pathname: `/games/${noSpaces(props.name)}`,
          state: { tags: props.tags, sessions: props.sessions },
        }}
      >
        <DynamicImage src={props.picture} alt="Avatar" />
        <Name>{props.name}</Name>
        {props.full && (
          <Sessions>{`${props.numSessions} ${
            props.numSessions === 1 ? 'session' : 'sessions'
          } available`}</Sessions>
        )}
      </StyledLink>
    </Container>
  )
}
