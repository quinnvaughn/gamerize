import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import ReactLoading from 'react-loading'
import _ from 'lodash'

import ErrorPage from './ErrorPage'
import NavBar from '../Components/NavBar'
import { useSearch } from '../State/SearchContext'
import SearchPageSearchBar from '../Components/SearchPageSearchBar'
import SearchPageSessions from '../Components/SearchPageSessions'
import SearchPageUsers from '../Components/SearchPageUsers'
import SearchPageGames from '../Components/SearchPageGames'
import SearchPageFilters from '../Components/SearchPageFilters'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`

const SearchGamerizeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  font-size: 2.4rem;
  font-weight: 600;
  @media (max-width: 640px) {
    padding: 2rem 2rem;
  }
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

const SEARCH_GAMERIZE = gql`
  query($input: SearchGamerizeInput!) {
    searchGamerize(input: $input) {
      type
      game {
        id
        tags
        name
        banner
        numSessions
      }
      user {
        id
        role
        profilePicture
        numSessions
        username
        displayName
      }
      session {
        id
        game {
          id
          name
        }
        title
        price
        system
        creator {
          id
          username
          displayName
          profilePicture
        }
        gamers {
          id
          username
        }
      }
    }
  }
`

export default function SearchPage(props) {
  const [search, dispatch] = useSearch()
  const { data, loading, error } = useQuery(SEARCH_GAMERIZE, {
    variables: { input: search },
    skip: search.text.length === 0,
  })
  const groups =
    !loading &&
    data &&
    _(data.searchGamerize)
      .groupBy(x => x.type)
      .value()
  const games = groups && groups.GAME
  const sessions = groups && groups.SESSION
  const users = groups && groups.USER
  useEffect(() => {
    return () => {
      dispatch({ type: 'CLEAR_TEXT' })
    }
  }, {})
  return error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <NavBar />
      {/* <SearchPageFilters /> */}
      <SearchPageSearchBar loading={loading} />
      {loading ? (
        <LoadingContainer>
          <ReactLoading type="bars" color="#db1422" width={100} height={500} />
        </LoadingContainer>
      ) : null}
      {search.text.length === 0 && (
        <SearchGamerizeContainer>Search Gamerize!</SearchGamerizeContainer>
      )}
      {!loading && data && data.searchGamerize.length === 0 && (
        <SearchGamerizeContainer>
          No results. Please try a different search.
        </SearchGamerizeContainer>
      )}
      <Content>
        <InnerContent>
          <SearchPageSessions sessions={sessions} />
          <SearchPageUsers users={users} />
          <SearchPageGames games={games} />
        </InnerContent>
      </Content>
    </PageContainer>
  )
}
