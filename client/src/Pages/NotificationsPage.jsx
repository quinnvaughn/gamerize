import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import _ from 'lodash'

//local imports
import NavBar from '../Components/NavBar'
import Loading from '../Components/Loading'
import NotificationFriendRequest from '../Components/NotificationFriendRequest'
import NotificationMiscellaneous from '../Components/NotificationMiscellaneous'
import NotificationBookingInvite from '../Components/NotificationBookingInvite'
import ErrorPage from './ErrorPage'
import useViewNotifications from '../Hooks/useViewNotifications'
import NotificationTypeList from '../Components/NotificationTypeList'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  margin: 0px auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: 92.8rem;
  @media (min-width: 1720px) {
    max-width: 160rem;
    padding-left: 8rem;
    padding-right: 8rem;
  }
`

const Title = styled.h2`
  margin-top: 2rem;
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  margin-bottom: 3.2rem;
`

const MY_NOTIFICATIONS = gql`
  {
    myUserNotifications {
      id
      text
      type
      friendRequest {
        id
        from {
          username
        }
      }
      bookingInvite {
        id
        booking {
          timeslot {
            gamingSession {
              system
              game {
                launcher
              }
            }
          }
        }
      }
    }
  }
`

function sortNotifications(loading, myUserNotifications) {
  const groups =
    !loading &&
    _(myUserNotifications)
      .groupBy(x => x.type)
      .value()
  const misc = []
  groups.ACCEPTED_FRIEND_REQUEST && misc.push(...groups.ACCEPTED_FRIEND_REQUEST)
  groups.ACCEPTED_TIMESLOT_INVITE &&
    misc.push(...groups.ACCEPTED_TIMESLOT_INVITE)
  groups.FRIEND_CANCELLED_THEIR_SLOT &&
    misc.push(...groups.FRIEND_CANCELLED_THEIR_SLOT)
  groups.GAMER_PUSHED_BACK_SLOT && misc.push(...groups.GAMER_PUSHED_BACK_SLOT)
  groups.CANCELLED_TIMESLOT && misc.push(...groups.CANCELLED_TIMESLOT)
  groups.ACCEPTED_GAMER_REQUEST && misc.push(...groups.ACCEPTED_GAMER_REQUEST)
  groups.DENIED_GAMER_REQUEST && misc.push(...groups.DENIED_GAMER_REQUEST)
  const friendRequests = groups.FRIEND_REQUEST
  const bookingInvites = groups.TIMESLOT_INVITE
  return { misc, friendRequests, bookingInvites }
}

export default function NotificationsPage(props) {
  const { data, loading, refetch, error } = useQuery(MY_NOTIFICATIONS, {
    pollInterval: 5000,
  })
  useViewNotifications()
  const { misc, friendRequests, bookingInvites } = sortNotifications(
    loading,
    data.myUserNotifications
  )
  const hasErrors = error
  const isLoading = loading
  return isLoading ? (
    <Loading />
  ) : hasErrors ? (
    <ErrorPage errors={hasErrors} />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Notifications</Title>
        <NotificationTypeList
          sectionTitle="Miscellaneous"
          array={misc}
          refetch={refetch}
          component={NotificationMiscellaneous}
        />
        <NotificationTypeList
          sectionTitle="Friend Requests"
          array={friendRequests}
          refetch={refetch}
          component={NotificationFriendRequest}
        />
        <NotificationTypeList
          sectionTitle="Booking Invites"
          array={bookingInvites}
          refetch={refetch}
          component={NotificationBookingInvite}
        />
      </Content>
    </PageContainer>
  )
}
