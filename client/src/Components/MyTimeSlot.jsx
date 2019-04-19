import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'

import DefaultSessionPicture from '../default-game.gif'
import { noSpaces } from '../utils/Strings'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

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
    color: #f10e0e;
  }
`

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
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

const PlayedWith = styled.span`
  font-size: 1.6rem;
`

const Player = styled(Link)`
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
  :visited {
    color: black;
  }
  :hover {
    text-decoration: underline;
    color: #f10e0e;
  }
`

const CancelContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

const CancelBooking = styled.button`
  background: #fff;
  padding: 1rem 1.4rem;
  color: #f10e0e;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const EmptyDiv = styled.div`
  height: 1.9rem;
  width: 100%;
`

const CANCEL_BOOKING = gql`
  mutation($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      cancelled
    }
  }
`

const CANCEL_NOT_BOOKEE_BOOKING = gql`
  mutation($input: CancelNotBookeeBookingInput!) {
    cancelNotBookeeBooking(input: $input) {
      cancelled
    }
  }
`
export default function MyTimeSlot({
  timeslot,
  me,
  upcoming,
  bookingId,
  refetch,
  bookee,
}) {
  const cancelBooking = useMutation(CANCEL_BOOKING)
  const cancelNotBookeeBooking = useMutation(CANCEL_NOT_BOOKEE_BOOKING)
  const dateFormat = 'MMMM Do, YYYY, h:mm a'
  let counter = 0
  const players = []
  // only have uniques
  const uniquePlayers = [
    ...new Set(timeslot.players.map(({ player }) => player.username)),
  ]
  while (counter < uniquePlayers.length) {
    if (uniquePlayers[counter] === me.username) {
    } else {
      players.push(
        <Player
          key={`${counter}${uniquePlayers[counter]}`}
          to={`/users/${uniquePlayers[counter]}`}
        >
          {counter === uniquePlayers.length - 2
            ? `${uniquePlayers[counter]}`
            : `${uniquePlayers[counter]}, `}
        </Player>
      )
    }
    counter++
  }
  return (
    <Container>
      <StyledLink
        to={`/users/${timeslot.gamingSession.creator.username}/${noSpaces(
          timeslot.gamingSession.game.name
        )}/${timeslot.gamingSession.id}`}
      >
        <SessionPictureContainer src={DefaultSessionPicture}>
          <SessionPictureSecond>
            <SessionPictureThird>
              <SessionPicture src={DefaultSessionPicture} />
            </SessionPictureThird>
          </SessionPictureSecond>
        </SessionPictureContainer>
      </StyledLink>
      <SessionInfo>
        <SessionDate>
          {dateFns.format(timeslot.startTime, dateFormat)}
        </SessionDate>
        {timeslot.gamingSession.gamers.map((gamer, index) => (
          <SessionGamer key={index + gamer.name}>{gamer.name}</SessionGamer>
        ))}
        {players.length > 0 ? (
          <PlayedWith>
            {upcoming ? 'Playing with: ' : 'Played with: '}
            {players}
          </PlayedWith>
        ) : null}
        <SessionGame>{timeslot.gamingSession.game.name}</SessionGame>
        {players.length === 0 && <EmptyDiv />}
        {upcoming && (
          <CancelContainer>
            <CancelBooking
              onClick={async () => {
                if (me.username === bookee.username) {
                  const input = { bookingId }
                  const { data } = await cancelBooking({ variables: { input } })
                  if (data.cancelBooking.cancelled) {
                    refetch()
                  }
                } else {
                  const input = { bookingId }
                  const { data } = await cancelNotBookeeBooking({
                    variables: { input },
                  })
                  if (data.cancelNotBookeeBooking.cancelled) {
                    refetch()
                  }
                }
              }}
            >
              Cancel session
            </CancelBooking>
          </CancelContainer>
        )}
      </SessionInfo>
    </Container>
  )
}
