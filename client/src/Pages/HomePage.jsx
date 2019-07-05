import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import Loading from '../Components/Loading'
import NavBar from '../Components/NavBar'

import Jumbotron from '../Components/Jumbotron'
import Footer from '../Components/Footer'
import useTitle from '../Hooks/useTitle'
import ErrorPage from './ErrorPage'
import useNotifications from '../Hooks/useNotifications'
import useEmailClick from '../Hooks/useEmailClick'
import useTwitterClick from '../Hooks/useTwitterClick'
import useMixpanelTrack from '../Hooks/useMixpanelTrack'
import HomePageDynamicRender from '../Components/HomePageDynamicRender'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  position: relative;
  min-height: 100vh;
  padding-bottom: 6rem;
`

const Content = styled.div`
  padding-top: 2rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: none;
  overflow-anchor: none;
  padding-bottom: 6rem;
  @media (min-width: 1128px) {
    margin: 0 auto;
    padding-left: 8rem;
    padding-right: 8rem;
  }
`

const InnerContent = styled.div`
  margin-left: -0.8rem;
  margin-right: -0.8rem;
  overflow: hidden;
`

const GET_SESSIONS = gql`
  query($first: Int, $orderBy: String) {
    allSessions(first: $first, orderBy: $orderBy) {
      id
      system
      price
      title
      slotsAvailable
      creator {
        id
        profilePicture
        displayName
        username
      }
      game {
        id
        name
      }
    }
    totalSessions
  }
`

const GET_GAMERS = gql`
  query($first: Int) {
    getGamers(first: $first) {
      displayName
      id
      username
      occupations
      profilePicture
      mostPlayedGames {
        name
      }
    }
    totalGamers
  }
`

const GET_GAMES = gql`
  query($first: Int, $orderBy: String) {
    allGames(first: $first, orderBy: $orderBy) {
      name
      tags
      id
      numSessions
      banner
    }
    totalGames
  }
`

export default function HomePage(props) {
  // Hooks
  useTitle('Gamerize - Play games with your favorite people')
  useNotifications()
  useMixpanelTrack('Consumer looked at website')
  useEmailClick()
  useTwitterClick()
  const [first, setFirst] = useState(4)

  const { data, loading, error } = useQuery(GET_GAMES, {
    variables: { first, orderBy: 'numSessions_DESC' },
    pollInterval: 10000,
  })
  const {
    data: secondData,
    loading: secondLoading,
    error: secondError,
  } = useQuery(GET_GAMERS, {
    variables: { first },
    pollInterval: 10000,
  })
  const {
    data: thirdData,
    loading: thirdLoading,
    error: thirdError,
  } = useQuery(GET_SESSIONS, {
    variables: { first },
    pollInterval: 10000,
  })
  const isLoading = loading || secondLoading || thirdLoading
  const hasErrors = error || secondError || thirdError
  return isLoading ? (
    <Loading />
  ) : hasErrors ? (
    <ErrorPage errors={hasErrors} />
  ) : (
    <PageContainer>
      <NavBar />
      <Jumbotron />
      <Content>
        <InnerContent>
          <HomePageDynamicRender
            maxWidth={969}
            setFirst={setFirst}
            setAt={4}
            first={first}
            thirdData={thirdData}
            secondData={secondData}
            data={data}
          />
          <HomePageDynamicRender
            minWidth={970}
            maxWidth={1239}
            setAt={6}
            setFirst={setFirst}
            first={first}
            thirdData={thirdData}
            secondData={secondData}
            data={data}
          />
          <HomePageDynamicRender
            minWidth={1240}
            maxWidth={1509}
            setAt={8}
            setFirst={setFirst}
            first={first}
            thirdData={thirdData}
            secondData={secondData}
            data={data}
          />
          <HomePageDynamicRender
            minWidth={1510}
            maxWidth={1779}
            setAt={5}
            setFirst={setFirst}
            first={first}
            thirdData={thirdData}
            secondData={secondData}
            data={data}
          />
          <HomePageDynamicRender
            minWidth={1780}
            setAt={6}
            setFirst={setFirst}
            first={first}
            thirdData={thirdData}
            secondData={secondData}
            data={data}
          />
        </InnerContent>
      </Content>
      <Footer />
    </PageContainer>
  )
}
