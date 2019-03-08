import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6666666666%;
  margin-bottom: 1rem;
`

const Avatar = styled.img`
  height: 10rem;
  width: 10rem;
`

const Name = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`

const Sessions = styled.p`
  font-size: 1.6rem;
  color: black;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.6rem;
  :hover {
    color: #f10e0e;
    cursor: pointer;
  }
`

const noSpaces = string => string.replace(/ /g, '_')

export default function Game(props) {
  return (
    <Container>
      <StyledLink
        to={{
          pathname: `/games/${noSpaces(props.name)}`,
          state: { tags: props.tags, sessions: props.sessions },
        }}
      >
        <Avatar src={DefaultAvatar} alt="Avatar" />
        <Name>{props.name}</Name>
        {props.full && (
          <Sessions>{`${props.sessions} sessions available`}</Sessions>
        )}
      </StyledLink>
    </Container>
  )
}
