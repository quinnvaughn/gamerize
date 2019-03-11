import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import DefaultAvatar from '../default-avatar.png'
import { noSpaces } from '../utils/Strings'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

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

const AvatarContainer = styled.div`
  width: 100%;
  padding-top: 66.6667%;
  position: relative;
  background-size: 100% 100%;
`

const AvatarSecond = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
`

const AvatarThird = styled.div`
  width: 100%;
  height: 100%;
  position: relative !important;
`

const Avatar = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
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

export default function Game(props) {
  return (
    <Container>
      <StyledLink
        to={{
          pathname: `/games/${noSpaces(props.name)}`,
          state: { tags: props.tags, sessions: props.sessions },
        }}
      >
        <AvatarContainer>
          <AvatarSecond>
            <AvatarThird>
              <Avatar src={DefaultAvatar} alt="Avatar" />
            </AvatarThird>
          </AvatarSecond>
        </AvatarContainer>
        <Name>{props.name}</Name>
        {props.full && (
          <Sessions>{`${props.sessions} sessions available`}</Sessions>
        )}
      </StyledLink>
    </Container>
  )
}
