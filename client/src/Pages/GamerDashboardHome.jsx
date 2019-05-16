import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import _ from 'lodash'
import { useQuery, useMutation } from 'react-apollo-hooks'

//local imports
import GamerBookings from '../Components/GamerBookings'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import Loading from '../Components/Loading'

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

const Stripe = styled.button`
margin-top: 4rem;
  background: #db1422;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
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

const LOG_INTO_STRIPE = gql`
  mutation {
    logIntoStripe {
      url
    }
  }
`

export default function GamerDashboardHome(props) {
  const { data, loading, refetch } = useQuery(MY_NOTIFICATIONS, {
    pollInterval: 500,
  })
  const viewGamerNotifications = useMutation(VIEW_NOTIFICATIONS)
  const logIntoStripe = useMutation(LOG_INTO_STRIPE)
  useEffect(() => {
    async function notifications() {
      await viewGamerNotifications()
    }
    notifications()
  }, {})
  const groups = useMemo(
    () =>
      !loading &&
      _(data.myGamerNotifications)
        .groupBy(x => x.type)
        .value()
  )
  const bookings = groups.BOOKED_TIMESLOT
  return loading ? (
    <Loading gamer />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
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
        <Stripe onClick={async () => {
          const {data} = await logIntoStripe() 
          window.location = data.logIntoStripe.url
        }}>Log into Stripe</Stripe>
      </Content>
    </PageContainer>
  )
}
