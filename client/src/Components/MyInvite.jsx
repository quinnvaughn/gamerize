import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

import DefaultSessionPicture from '../default-game.gif'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

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

const SearchPlayers = styled.input`
  height: 3rem;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  border: none;
  outline: 0;
`

const SearchPlayersContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  margin-top: 1rem;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const Dropdown = styled.div`
  top: 4.3rem;
  z-index: 3;
  left: 0;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #ebebeb;
  height: 8rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const DropdownOption = styled.div`
  background: #fff;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
  padding: 1rem;
`

const InvitesContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`

const SendInvite = styled.button`
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  pointer-events: ${props => props.disabled && 'none'};
`

const CancelSlot = styled.button`
  background: #fff;
  padding: 1rem 1.4rem;
  color: #db1422;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const SEARCH_USERS = gql`
  query($search: String!, $gamers: [String!]!, $inviteId: String!) {
    searchUsersForInvite(
      search: $search
      gamers: $gamers
      inviteId: $inviteId
    ) {
      username
    }
  }
`

const SEND_INVITE = gql`
  mutation($input: SendInviteInput!) {
    sendInvite(input: $input) {
      sent
    }
  }
`

const CANCEL_EXTRA_SLOT = gql`
  mutation($input: CancelExtraSlotInput!) {
    cancelExtraSlot(input: $input) {
      cancelled
    }
  }
`

export default function MyInvite({ inviteId, timeslot, me, refetch }) {
  // Can't send an invite to yourself or the gamers
  let gamers = timeslot.gamers.map(gamer => gamer.username.toLowerCase())
  gamers = [...gamers, me.toLowerCase()]
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(false)
  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: { search, gamers, inviteId },
  })
  const sendInvite = useMutation(SEND_INVITE)
  const cancelExtraSlot = useMutation(CANCEL_EXTRA_SLOT)
  const node = useRef(null)
  const [dropdown, setDropdown] = useState(false)
  const dateFormat = 'MMMM Do, YYYY, h:mm a'
  useOnOutsideClick(node, () => {
    setDropdown(false)
  })
  return (
    <Container>
      <Margins>
        <SessionPictureContainer
          src={timeslot.gamingSession.creator.profilePicture}
        >
          <SessionPictureSecond>
            <SessionPictureThird>
              <SessionPicture
                src={timeslot.gamingSession.creator.profilePicture}
              />
            </SessionPictureThird>
          </SessionPictureSecond>
        </SessionPictureContainer>
        <SessionInfo>
          <SessionDate>
            {dateFns.format(timeslot.startTime, dateFormat)}
          </SessionDate>
          {timeslot.gamers.map((gamer, index) => (
            <SessionGamer key={index + gamer.name}>
              {timeslot.gamingSession.creator.displayName}
            </SessionGamer>
          ))}
          <SessionGame>{timeslot.gamingSession.game.name}</SessionGame>
          <SearchPlayersContainer ref={node}>
            <SearchPlayers
              placeholder="Send invite"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={() => {
                setDropdown(true)
                setSelected(false)
              }}
            />
            {dropdown && (
              <Dropdown>
                {search &&
                  !loading &&
                  data.searchUsersForInvite.map(user => (
                    <DropdownOption
                      key={user.username}
                      onClick={() => {
                        setSearch(user.username)
                        setDropdown(false)
                        setSelected(true)
                      }}
                    >
                      {user.username}
                    </DropdownOption>
                  ))}
              </Dropdown>
            )}
          </SearchPlayersContainer>
          <InvitesContainer>
            <CancelSlot
              onClick={async () => {
                const input = { inviteId }
                const { data } = await cancelExtraSlot({ variables: { input } })
                if (data.cancelExtraSlot.cancelled) {
                  refetch()
                }
              }}
            >
              Cancel Slot
            </CancelSlot>
            <SendInvite
              disabled={!selected}
              onClick={async () => {
                const input = { inviteId, username: search }
                const { data } = await sendInvite({ variables: { input } })
                if (data.sendInvite.sent) {
                  refetch()
                }
              }}
            >
              Send Invite
            </SendInvite>
          </InvitesContainer>
        </SessionInfo>
      </Margins>
    </Container>
  )
}
