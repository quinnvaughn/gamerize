import React from 'react'
import styled from 'styled-components'

import AdminDashboardNav from '../Components/AdminDashboardNav'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'

import { currencyFormat } from '../utils/Strings'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
`

const GamerRequests = styled.div`
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

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

const Data = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`

const STATISTICS = gql`
  {
    numUsers
    numGamers
    numTimeslotsBooked
    ourTakeHome
    numSessionsPlayed
    numSessionsPlayedToday
  }
`

export default function AdminDashboardStatsPage(props) {
  const { data, loading, error } = useQuery(STATISTICS)
  console.log(error)
  return loading ? (
    <Loading admin />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <AdminDashboardNav />
      <Content>
        <Top>
          <GamerRequests>Statistics</GamerRequests>
          <Title>Number of Users</Title>
          <Data>{data.numUsers}</Data>
          <Title>Number of Gamers</Title>
          <Data>{data.numGamers}</Data>
          <Title>Number of Timeslots Booked</Title>
          <Data>{data.numTimeslotsBooked}</Data>
          <Title>Our Take Home</Title>
          <Data>{currencyFormat(data.ourTakeHome)}</Data>
          <Title>Number of Sessions Played</Title>
          <Data>{data.numSessionsPlayed}</Data>
          <Title>Number of Sessions Played Today</Title>
          <Data>{data.numSessionsPlayedToday}</Data>
        </Top>
      </Content>
    </PageContainer>
  )
}
