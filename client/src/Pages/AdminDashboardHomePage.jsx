import React from 'react'
import styled from 'styled-components'

//local imports
import AdminDashboardNav from '../Components/AdminDashboardNav'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Loading from '../Components/Loading'
import GamerRequestTableColumns from '../Components/GamerRequestTableColumns'
import ErrorPage from './ErrorPage'
import GamerRequestRowList from '../Components/GamerRequestRowList'

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

const Table = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
`

const NumRequests = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

const GET_GAMER_REQUESTS = gql`
  {
    getGamerRequests {
      id
      user {
        id
        username
      }
      socialMedia {
        twitter
      }
      occupations
    }
  }
`

const GET_NUM_REQUESTS = gql`
  {
    numGamerRequests
  }
`

export default function AdminDashboardGamerHomePage(props) {
  const { data, loading, refetch, error } = useQuery(GET_GAMER_REQUESTS, {
    pollInterval: 1000,
  })
  const {
    data: secondData,
    loading: secondLoading,
    error: secondError,
  } = useQuery(GET_NUM_REQUESTS, {
    pollInterval: 1000,
  })
  const hasErrors = error || secondError
  const isLoading = loading || secondLoading
  return isLoading ? (
    <Loading admin />
  ) : hasErrors ? (
    <ErrorPage errors={hasErrors} />
  ) : (
    <PageContainer>
      <AdminDashboardNav />
      <Content>
        <Top>
          <GamerRequests>Gamer Requests</GamerRequests>
          <NumRequests>
            {secondData.numGamerRequests}{' '}
            {secondData.numGamerRequests === 1 ? 'Request' : 'Requests'}
          </NumRequests>
          <Table>
            <GamerRequestTableColumns />
            <GamerRequestRowList
              array={data.getGamerRequests}
              refetch={refetch}
            />
          </Table>
        </Top>
      </Content>
    </PageContainer>
  )
}
