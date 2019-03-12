import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'
import { noSpaces } from '../utils/Strings'
import DynamicImage from './DynamicImage'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

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
    color: #f10e0e;
    cursor: pointer;
  }
`

export default function ExploreGame(props) {
  return (
    <Container>
      <StyledLink
        to={{
          pathname: `/games/${noSpaces(props.name)}`,
          state: { tags: props.tags, sessions: props.sessions },
        }}
      >
        <DynamicImage src={DefaultAvatar} alt="Avatar" />
        <Name>{props.name}</Name>
        {props.full && (
          <Sessions>{`${props.sessions} sessions available`}</Sessions>
        )}
      </StyledLink>
    </Container>
  )
}
