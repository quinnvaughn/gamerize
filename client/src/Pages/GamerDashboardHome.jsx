import React, { useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import _ from 'lodash'
import { useQuery, useMutation } from 'react-apollo-hooks'

//local imports
import GamerBookings from '../Components/GamerBookings'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
`

const Home = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Top = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
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
    myGamerNotifications {
      id
      text
      type
      booking {
        numPlayers
        numSlots
        total
        timeslot {
          startTime
          endTime
        }
      }
    }
  }
`

const VIEW_NOTIFICATIONS = gql`
  mutation {
    viewGamerNotifications {
      viewed
    }
  }
`

export default function GamerDashboardHome(props) {
  const { data, loading, refetch } = useQuery(MY_NOTIFICATIONS, {
    pollInterval: 1000,
  })
  const viewGamerNotifications = useMutation(VIEW_NOTIFICATIONS)
  useEffect(() => {
    async function notifications() {
      await viewGamerNotifications()
    }
    notifications()
  }, {})
  const groups =
    !loading &&
    _(data.myGamerNotifications)
      .groupBy(x => x.type)
      .value()
  const bookings = groups.BOOKED_TIMESLOT
  return (
    <PageContainer>
      <Content>
        <Top>
          <Home>Home</Home>
        </Top>
        <Section>
          <SectionTitle>Bookings</SectionTitle>
          {bookings &&
            bookings.map((notification, index) => (
              <GamerBookings
                refetch={refetch}
                notification={notification}
                key={notification.id}
                last={index === bookings.length - 1}
              />
            ))}
        </Section>
      </Content>
    </PageContainer>
  )
}
