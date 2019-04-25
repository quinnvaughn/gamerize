import React from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 0;
  flex-wrap: wrap;
`

const Cell = styled.div`
  padding: 2rem 1rem;
  border: 1px solid #d3d3d3;
  flex-grow: 1;
  word-wrap: break-word;
  font-size: 1.4rem;
  width: 12rem;
`

const Approve = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border: 0;
  border-radius: 4px;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  margin-bottom: 0.5rem;
  cursor: pointer;
`

const Deny = styled.button`
  color: #db1422;
  text-decoration: none;
  outline: 0;
  border: 1px solid #db1422;
  width: 100%;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#fff')};
  pointer-events: ${props => props.disabled && 'none'};
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: #db1422;
  }
`

const ACCEPT_REQUEST = gql`
  mutation($input: AcceptGamerRequestInput!) {
    acceptGamerRequest(input: $input) {
      accepted
    }
  }
`

const DECLINE_REQUEST = gql`
  mutation($input: DeclineGamerRequestInput!) {
    declineGamerRequest(input: $input) {
      declined
    }
  }
`

export default function GamerRequestRow(props) {
  const acceptGamerRequest = useMutation(ACCEPT_REQUEST)
  const declineGamerRequest = useMutation(DECLINE_REQUEST)
  return (
    <Container>
      <Cell>
        <StyledLink to={`/users/${props.user.username}`}>
          {props.user.username}
        </StyledLink>
      </Cell>
      <Cell>{props.socialMedia.twitter}</Cell>
      <Cell>{props.socialMedia.facebook}</Cell>
      <Cell>{props.socialMedia.twitch}</Cell>
      <Cell>{props.socialMedia.youtube}</Cell>
      <Cell>{props.socialMedia.instagram}</Cell>
      <Cell>{props.socialMedia.snapchat}</Cell>
      <Cell>{props.occupations}</Cell>
      <Cell>
        <Approve
          onClick={async () => {
            const input = { gamerRequestId: props.id }
            const { data } = await acceptGamerRequest({ variables: { input } })
            if (data.acceptGamerRequest.accepted) {
              props.refetch()
            }
          }}
        >
          Approve
        </Approve>
        <Deny
          onClick={async () => {
            const input = { gamerRequestId: props.id }
            const { data } = await declineGamerRequest({ variables: { input } })
            if (data.declineGamerRequest.declined) {
              props.refetch()
            }
          }}
        >
          Deny
        </Deny>
      </Cell>
    </Container>
  )
}
