import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6666666666%;
  margin-bottom: 10px;
`

const Avatar = styled.img`
  height: 100px;
  width: 100px;
`

const Name = styled.h4`
  font-size: 18px;
  margin-bottom: 3px;
`

const Sessions = styled.p`
  font-size: 16px;
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
