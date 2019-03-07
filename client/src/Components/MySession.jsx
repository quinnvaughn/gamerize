import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'

import DefaultSessionPicture from '../default-game.gif'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  position: relative;
  :last-child {
    margin-right: 0;
  }
  @media (min-width: 744px) {
    width: 33.333% !important;
  }
  @media (min-width: 1128px) {
    width: 25% !important;
  }
`

const SessionPictureContainer = styled.div`
  width: 100%;
  padding-top: 66.6667%;
  position: relative;
  background-size: 100% 100%;
`

const SessionPictureSecond = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 100% !important;
`

const SessionPictureThird = styled.div`
  width: 100%;
  height: 100%;
  position: relative !important;
`

const SessionPicture = styled.div`
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

const StyledLink = styled(Link)`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  cursor: pointer;
  :hover {
    color: #e62739;
  }
`

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  cursor: pointer;
`

const SessionDate = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2em;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SessionGamer = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.375em;
`
const SessionGame = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 400;
`

const noUnderscores = string => string.replace(/_/g, ' ')

export default function MySession({ session }) {
  const dateFormat = 'MMMM Do, YYYY, h:mm a'
  return (
    <Container>
      <StyledLink to={`/users/${session.username}/${session.game}`}>
        <SessionPictureContainer src={DefaultSessionPicture}>
          <SessionPictureSecond>
            <SessionPictureThird>
              <SessionPicture src={DefaultSessionPicture} />
            </SessionPictureThird>
          </SessionPictureSecond>
        </SessionPictureContainer>
        <SessionInfo>
          <SessionDate>
            {dateFns.format(session.timeStart, dateFormat)}
          </SessionDate>
          <SessionGamer>{session.gamer}</SessionGamer>
          <SessionGame>{noUnderscores(session.game)}</SessionGame>
        </SessionInfo>
      </StyledLink>
    </Container>
  )
}
