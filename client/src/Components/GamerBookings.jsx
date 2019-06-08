import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import dateFns from 'date-fns'

const Container = styled.div`
  padding: 2rem 0;
  border-bottom: ${props => (props.last ? 'none' : '1px solid #ebebeb')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TextContainer = styled.div``

const Text = styled.div`
  font-size: 1.6rem;
`

const User = styled(Link)`
  display: inline;
  color: black;
  font-size: 1.6rem;
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: #db1422;
    text-decoration: underline;
  }
`

const Info = styled.div``

const Day = styled.span`
  font-size: 1.4rem;
`

const Start = styled.span`
  font-size: 1.4rem;
`

const End = styled.span`
  font-size: 1.4rem;
`

const Slots = styled.span`
  font-size: 1.4rem;
`

const Players = styled.span`
  font-size: 1.4rem;
`

const Total = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
`

const Dot = styled.span`
  font-size: 1.4rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
`

const Close = styled(MdClose)`
  font-size: 1.6rem;
  color: black;
  margin-right: 4rem;
  :hover {
    color: #db1422;
    cursor: pointer;
  }
`

const DELETE_NOTIFICATION = gql`
  mutation($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      deleted
    }
  }
`

export default function GamerBookings({ notification, refetch }) {
  const text = notification.text
    .split(' ')
    .splice(1)
    .join(' ')
    .replace(/,/g, ' ')
  const username = notification.text.split(' ')[0]
  const deleteNotification = useMutation(DELETE_NOTIFICATION)
  const dayFormat = 'MMM Do'
  const timeFormat = 'h:mm aa'
  return (
    <Container>
      <TextContainer>
        <Text>
          <User to={`/users/${username}`}>{username}</User>
          {` ${text}`}
        </Text>
      </TextContainer>
      <Info>
        <Day>
          {dateFns.format(notification.booking.timeslot.startTime, dayFormat)}
        </Day>
        <Dot>&bull;</Dot>
        <Start>
          {`${dateFns.format(
            notification.booking.timeslot.startTime,
            timeFormat
          )}-`}
        </Start>
        <End>
          {dateFns.format(notification.booking.timeslot.endTime, timeFormat)}
        </End>
        <Dot>&bull;</Dot>
        <Slots>{`${notification.booking.numSlots} slots`}</Slots>
        <Dot>&bull;</Dot>
        <Players>{`${notification.booking.numPlayers} players`}</Players>
        <Dot>&bull;</Dot>
        <Total>{`$${notification.booking.total}`}</Total>
      </Info>
      <Close
        onClick={async () => {
          const input = { notificationId: notification.id }
          const { data } = await deleteNotification({ variables: { input } })
          if (data.deleteNotification.deleted) {
            refetch()
          }
        }}
      />
    </Container>
  )
}
