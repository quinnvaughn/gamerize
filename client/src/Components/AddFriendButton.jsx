import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import useDropdown from '../Hooks/useDropdown'

const PendingOrRespond = styled.button`
  background: #ebebeb;
  padding: 1rem 1.4rem;
  color: black;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 4.1rem;
  position: relative;
`

const Friends = styled.button`
  background: #fff;
  padding: 1rem 1.4rem;
  color: #f10e0e;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  height: 4.1rem;
  position: relative;
`

const AddFriend = styled.button`
  background: ${props => (props.friends ? '#fff' : '#f10e0e')};
  padding: 1rem 1.4rem;
  color: ${props => (props.friends ? '#f10e0e' : '#fff')};
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  height: 4.1rem;
  position: relative;
`

const Dropdown = styled.div`
  top: 4rem;
  z-index: 3;
  left: 0;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #ebebeb;
  height: 8rem;
`

const DropdownOption = styled.div`
  background: #fff;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
  padding: 1rem;
`

const SEND_FRIEND_REQUEST = gql`
  mutation($input: SendFriendRequestInput!) {
    sendFriendRequest(input: $input) {
      sent
    }
  }
`

const ACCEPT_FRIEND_REQUEST = gql`
  mutation($input: AcceptFriendRequestInput!) {
    acceptFriendRequest(input: $input) {
      accepted
    }
  }
`

const DECLINE_FRIEND_REQUEST = gql`
  mutation($input: DeclineFriendRequestInput!) {
    declineFriendRequest(input: $input) {
      declined
    }
  }
`

export default function AddFriendButton({
  pending,
  respond,
  username,
  refetch,
  friends,
}) {
  const node = useRef()
  const sendFriendRequest = useMutation(SEND_FRIEND_REQUEST)
  const acceptFriendRequest = useMutation(ACCEPT_FRIEND_REQUEST)
  const declineFriendRequest = useMutation(DECLINE_FRIEND_REQUEST)
  const [dropdown, setDropdown] = useDropdown(node)
  return pending || respond ? (
    <PendingOrRespond ref={node}>
      {pending ? 'Pending' : 'Respond'}
      {//Need to add pending option - cancel invite. Also don't show confirm or deny on it.
      dropdown ? (
        <Dropdown>
          <DropdownOption
            onClick={async () => {
              const input = { username }
              const { data } = await acceptFriendRequest({
                variables: { input },
              })
              if (data.acceptFriendRequest.accepted) {
                setDropdown(false)
                refetch()
              }
            }}
          >
            Confirm
          </DropdownOption>
          <DropdownOption
            onClick={async () => {
              const input = { username }
              const { data } = await declineFriendRequest({
                variables: { input },
              })
              if (data.declineFriendRequest.declined) {
                setDropdown(false)
                refetch()
              }
            }}
          >
            Deny
          </DropdownOption>
        </Dropdown>
      ) : null}
    </PendingOrRespond>
  ) : friends ? (
    <Friends>Friends</Friends>
  ) : (
    <AddFriend
      friends={friends}
      onClick={async () => {
        // Dropdown for cancel request, respond to request
        const input = { username }
        if (pending || respond || friends) {
        } else {
          const { data } = await sendFriendRequest({
            variables: { input },
          })
          if (data.sendFriendRequest.sent) {
            refetch()
            setDropdown(false)
          }
        }
      }}
    >
      Add Friend
    </AddFriend>
  )
}
