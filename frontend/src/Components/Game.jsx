import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.6666666666%;
`

const Avatar = styled.img`
  height: 100px;
  width: 100px;
`

const Name = styled.h4`
  font-size: 18px;
  color: black;
  margin-bottom: 3px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`

export default function Game(props) {
  return (
    <Container>
      <StyledLink to={`/games/${props.name}`}>
        <Avatar src={DefaultAvatar} alt="Avatar" />
        <Name>{props.name}</Name>
      </StyledLink>
    </Container>
  )
}
