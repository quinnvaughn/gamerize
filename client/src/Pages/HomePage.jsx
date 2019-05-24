import React, { useState, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import Media from 'react-media'

//local imports
import Loading from '../Components/Loading'
import NavBar from '../Components/NavBar'
import GamerRow from '../Components/TopGamersRow'

import Jumbotron from '../Components/Jumbotron'
import GamesRow from '../Components/TopGamesRow'
import Footer from '../Components/Footer'
import useTitle from '../Hooks/useTitle'
import TopSessionsRow from '../Components/TopSessionsRow'
import { Mixpanel } from '../Components/Mixpanel'

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
      picture
    }
    totalGames
  }
`

export default function HomePage(props) {
  useTitle('Gamerize - Play games with your favorite people')
  useEffect(() => {
    Mixpanel.track('Consumer looked at website.')
  }, {})
  const [first, setFirst] = useState(4)
  const { data, loading } = useQuery(GET_GAMES, {
    variables: { first, orderBy: 'numSessions_DESC' },
  })
  const { data: secondData, loading: secondLoading } = useQuery(GET_GAMERS, {
    variables: { first },
  })
  const { data: thirdData, loading: thirdLoading } = useQuery(GET_SESSIONS, {
    variables: { first },
  })
  const wait = loading || secondLoading || thirdLoading
  return wait ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Jumbotron />
      <Content>
        <InnerContent>
          <Media query={{ maxWidth: 969 }}>
            {matches => {
              matches && setFirst(4)
              return matches ? (
                <Fragment>
                  <TopSessionsRow
                    title="Sessions"
                    data={thirdData}
                    first={first}
                  />
                  <GamerRow title="Gamers" data={secondData} first={first} />
                  <GamesRow title="Games" data={data} first={first} />
                </Fragment>
              ) : null
            }}
          </Media>
          <Media query={{ minWidth: 970, maxWidth: 1239 }}>
            {matches => {
              matches && setFirst(6)
              return matches ? (
                <Fragment>
                  <TopSessionsRow
                    title="Sessions"
                    data={thirdData}
                    first={first}
                  />
                  <GamerRow title="Gamers" data={secondData} first={first} />
                  <GamesRow title="Games" data={data} first={first} />
                </Fragment>
              ) : null
            }}
          </Media>
          <Media query={{ minWidth: 1240, maxWidth: 1509 }}>
            {matches => {
              matches && setFirst(8)
              return matches ? (
                <Fragment>
                  <TopSessionsRow
                    title="Sessions"
                    data={thirdData}
                    first={first}
                  />
                  <GamerRow title="Gamers" data={secondData} first={first} />
                  <GamesRow title="Games" data={data} first={first} />
                </Fragment>
              ) : null
            }}
          </Media>
          <Media query={{ minWidth: 1510, maxWidth: 1779 }}>
            {matches => {
              matches && setFirst(5)
              return matches ? (
                <Fragment>
                  <TopSessionsRow
                    title="Sessions"
                    data={thirdData}
                    first={first}
                  />
                  <GamerRow title="Gamers" data={secondData} first={first} />
                  <GamesRow title="Games" data={data} first={first} />
                </Fragment>
              ) : null
            }}
          </Media>
          <Media query={{ minWidth: 1780 }}>
            {matches => {
              matches && setFirst(6)
              return matches ? (
                <Fragment>
                  <TopSessionsRow
                    title="Sessions"
                    data={thirdData}
                    first={first}
                  />
                  <GamerRow title="Gamers" data={secondData} first={first} />
                  <GamesRow title="Games" data={data} first={first} />
                </Fragment>
              ) : null
            }}
          </Media>
        </InnerContent>
      </Content>
      <Footer />
    </PageContainer>
  )
}
