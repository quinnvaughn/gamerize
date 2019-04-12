import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import _ from 'lodash'

//local imports
import NavBar from '../Components/NavBar'
import NotificationFriendRequest from '../Components/NotificationFriendRequest'
import NotificationMiscellaneous from '../Components/NotificationMiscellaneous'
import NotificationBookingInvite from '../Components/NotificationBookingInvite'

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

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const SectionTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid black;
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
            passed
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

const MYSELF = gql`
  {
    me {
      id
      gamertags {
        psn
        xbl
        nso
        pc {
          epic
          origin
          steam
          bethesda
          battlenet
        }
      }
    }
  }
`

const VIEW_NOTIFICATIONS = gql`
  mutation {
    viewUserNotifications {
      viewed
    }
  }
`

export default function NotificationsPage(props) {
  const { data, loading, refetch } = useQuery(MY_NOTIFICATIONS, {
    pollInterval: 5000,
  })
  const { data: secondData, loading: secondLoading } = useQuery(MYSELF)
  const viewUserNotifications = useMutation(VIEW_NOTIFICATIONS)
  useEffect(() => {
    async function notifications() {
      await viewUserNotifications()
    }
    notifications()
  }, {})
  const groups =
    !loading &&
    _(data.myUserNotifications)
      .groupBy(x => x.type)
      .value()
  const misc = []
  groups.ACCEPTED_FRIEND_REQUEST && misc.push(...groups.ACCEPTED_FRIEND_REQUEST)
  groups.ACCEPTED_TIMESLOT_INVITE &&
    misc.push(...groups.ACCEPTED_TIMESLOT_INVITE)
  groups.CANCELLED_TIMESLOT && misc.push(...groups.CANCELLED_TIMESLOT)
  groups.ACCEPTED_GAMER_REQUEST && misc.push(...groups.ACCEPTED_GAMER_REQUEST)
  groups.DENIED_GAMER_REQUEST && misc.push(...groups.DENIED_GAMER_REQUEST)
  const friendRequests = groups.FRIEND_REQUEST
  const bookingInvites = groups.TIMESLOT_INVITE
  return loading || secondLoading ? null : (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Notifications</Title>
        <Section>
          <SectionTitle>Miscellaneous</SectionTitle>
          {misc &&
            misc.map((notification, index) => (
              <NotificationMiscellaneous
                refetch={refetch}
                notification={notification}
                key={notification.id}
                last={index === misc.length - 1}
              />
            ))}
        </Section>
        <Section>
          <SectionTitle>Friend Requests</SectionTitle>
          {friendRequests &&
            friendRequests.map((notification, index) => (
              <NotificationFriendRequest
                refetch={refetch}
                notification={notification}
                key={notification.id}
                last={index === friendRequests.length - 1}
              />
            ))}
        </Section>
        <Section>
          <SectionTitle>Booking Invites</SectionTitle>
          {bookingInvites &&
            bookingInvites.map((notification, index) => (
              <NotificationBookingInvite
                gamertags={secondData.me.gamertags}
                refetch={refetch}
                notification={notification}
                key={notification.id}
                last={index === bookingInvites.length - 1}
              />
            ))}
        </Section>
      </Content>
    </PageContainer>
  )
}
