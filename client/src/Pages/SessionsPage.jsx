import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
//local imports
import NavBar from '../Components/NavBar'
import DisplaySessions from '../Components/DisplaySessions'
import Loading from '../Components/Loading'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding-top: 2rem;

  @media (max-width: 1127px) {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }

  @media (min-width: 1128px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }
`

const Title = styled.h2`
  font-weight: 800;
  font-size: 3rem;
`

const GET_SESSIONS = gql`
  query {
    allSessions {
      id
      system
      price
      title
      creator {
        profilePicture
        name
        username
      }
      game {
        name
      }
    }
    totalSessions
  }
`

export default function SessionsPage(props) {
  const { data, loading } = useQuery(GET_SESSIONS)
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Explore sessions</Title>
        <DisplaySessions data={data} />
      </Content>
    </PageContainer>
  )
}
