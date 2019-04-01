import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

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
  position: absolute;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
`

const Margins = styled.div`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.6rem;
  text-decoration: none;
  color: black;
`

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`

const InviteButtonContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`

const AcceptInvite = styled.button`
  background: #f10e0e;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const DeclineInvite = styled.button`
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

const ACCEPT_INVITE = gql`
  mutation($input: AcceptInviteInput!) {
    acceptInvite(input: $input) {
      accepted
    }
  }
`

const DECLINE_INVITE = gql`
  mutation($input: DeclineInviteInput!) {
    declineInvite(input: $input) {
      declined
    }
  }
`

export default function MyInviteReceived({ timeslot, refetch, inviteId }) {
  const dateFormat = 'MMMM Do, YYYY, h:mm a'
  const acceptInvite = useMutation(ACCEPT_INVITE)
  const declineInvite = useMutation(DECLINE_INVITE)
  return (
    <Container>
      <Margins>
        <SessionPictureContainer src={DefaultSessionPicture}>
          <SessionPictureSecond>
            <SessionPictureThird>
              <SessionPicture src={DefaultSessionPicture} />
            </SessionPictureThird>
          </SessionPictureSecond>
        </SessionPictureContainer>
        <SessionInfo>
          <SessionDate>
            {dateFns.format(timeslot.startTime, dateFormat)}
          </SessionDate>
          {timeslot.gamers.map((gamer, index) => (
            <SessionGamer key={index + gamer.name}>{gamer.name}</SessionGamer>
          ))}
          <SessionGame>{timeslot.gamingSession.game.name}</SessionGame>
          <InviteButtonContainer>
            <DeclineInvite
              onClick={async () => {
                const input = { inviteId }
                const { data } = await declineInvite({ variables: { input } })
                if (data.declineInvite.declined) {
                  refetch()
                }
              }}
            >
              Decline Invite
            </DeclineInvite>
            <AcceptInvite
              onClick={async () => {
                const input = { inviteId }
                const { data } = await acceptInvite({ variables: { input } })
                if (data.acceptInvite.accepted) {
                  refetch()
                }
              }}
            >
              Accept Invite
            </AcceptInvite>
          </InviteButtonContainer>
        </SessionInfo>
      </Margins>
    </Container>
  )
}
