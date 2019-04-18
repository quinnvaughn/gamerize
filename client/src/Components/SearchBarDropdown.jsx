import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { FaChevronLeft } from 'react-icons/fa'
import gql from 'graphql-tag'

//local imports
import SearchResultGame from './SearchResultGame'
import SearchResultSession from './SearchResultSession'
import SearchResultUser from './SearchResultUser'
import useQueryNotBugged from '../Hooks/useQueryNotBugged'

const Results = styled.div`
  box-shadow: rgba(26, 26, 29, 0.3) 0px 15px 46px -10px;
  padding-top: 0.8rem;
  background: #fff;
  border: 1px solid rgb(235, 235, 235);
  position: absolute;
  top: 4.6rem;
  width: 100%;
  border-radius: 0 0 4px 4px;
  max-height: 50rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.8rem;
  color: black;
  margin-right: 1rem;
  :hover {
    transition: 0.25s ease-out;
    color: #f10e0e;
  }
`

const Explore = styled.div`
  padding: 1.6rem 2.4rem;
  padding-left: 3.2rem;
  font-size: 1.4rem;
  font-weight: 600;
`

const Type = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #f10e0e;
`

const BigType = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: black;
`

const BigContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(235, 235, 235);
  padding: 0.4rem 2.4rem;
  display: flex;
  align-items: center;
  padding-left: 3.2rem;
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(235, 235, 235);
  padding: 0.4rem 2.4rem;
  align-items: flex-end;
  padding-left: 3.2rem;
`

const More = styled.div`
  font-size: 1.6rem;
  color: #d3d3d3;
  cursor: pointer;
`

const LoadMore = styled.div`
  color: #f10e0e;
  font-weight: 600;
  font-size: 1.8rem;
  padding: 1.6rem 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
`

const mapSessions = (sessions, first) => {
  return sessions.map((session, index) => {
    return (
      index <= first - 1 && (
        <SearchResultSession
          title={session.session.title}
          gamers={session.session.gamers}
          game={session.session.game}
          id={session.session.id}
          price={session.session.price}
          creator={session.session.creator}
        />
      )
    )
  })
}

const mapGames = (games, first) => {
  return games.map((game, index) => {
    return (
      index <= first - 1 && (
        <SearchResultGame game={game.game.name} tags={game.game.tags} />
      )
    )
  })
}

const mapUsers = (users, first) => {
  return users.map((user, index) => {
    return (
      index <= first - 1 && (
        <SearchResultUser
          username={user.user.username}
          name={user.user.name}
          gamer={user.user.role === 'GAMER'}
          numSessions={user.user.numSessions}
        />
      )
    )
  })
}

export default function SearchBarDropdown(props) {
  const groups =
    props.data &&
    _(props.data.searchGamerize)
      .groupBy(x => x.type)
      .value()
  const games = groups && groups.GAME
  const sessions = groups && groups.SESSION
  const users = groups && groups.USER
  const gamesMore = games && games.length >= 7
  const sessionsMore = sessions && sessions.length >= 7
  const usersMore = users && users.length >= 7
  const [more, setMore] = useState(null)
  return more === 'SESSION' ? (
    <SessionMore setMore={setMore} search={props.search} />
  ) : more === 'GAME' ? (
    <GameMore setMore={setMore} search={props.search} />
  ) : more === 'USER' ? (
    <UserMore setMore={setMore} search={props.search} />
  ) : (
    <Results>
      <Explore>Explore Gamerize</Explore>
      <TopContainer>
        <Type>Sessions</Type>
        {sessionsMore && <More onClick={() => setMore('SESSION')}>More</More>}
      </TopContainer>
      {sessions && mapSessions(sessions, 6)}
      <TopContainer>
        <Type>Games</Type>
        {gamesMore && <More onClick={() => setMore('GAME')}>More</More>}
      </TopContainer>
      {games && mapGames(games, 6)}
      <TopContainer>
        <Type>Users</Type>
        {usersMore && <More onClick={() => setMore('USER')}>More</More>}
      </TopContainer>
      {users && mapUsers(users, 6)}
    </Results>
  )
}

const MORE_SESSIONS = gql`
  query($search: String!, $skip: Int) {
    moreSessions(search: $search, skip: $skip) {
      id
      game {
        name
      }
      title
      price
      creator {
        username
      }
      gamers {
        username
      }
    }
  }
`

function SessionMore(props) {
  const [needMore, setNeedMore] = useState(true)
  const { data, loading, fetchMore } = useQueryNotBugged(MORE_SESSIONS, {
    variables: { search: props.search },
  })
  useEffect(() => {
    if (!loading && data && data.moreSessions.length < 10) {
      setNeedMore(false)
    }
  }, [data])
  return (
    <Results>
      <BigContainer>
        <ChevronLeft onClick={() => props.setMore(null)} />
        <BigType>Sessions</BigType>
      </BigContainer>
      {!loading &&
        data &&
        data.moreSessions.map(session => (
          <SearchResultSession
            title={session.title}
            gamers={session.gamers}
            game={session.game}
            id={session.id}
            creator={session.creator}
          />
        ))}
      {!loading && needMore && (
        <LoadMore
          onClick={async () => {
            await fetchMore({
              variables: {
                search: props.search,
                skip: data.moreSessions.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (fetchMoreResult.moreSessions.length < 10) {
                  setNeedMore(false)
                  return prev
                }
                if (fetchMoreResult.moreSessions.length === 0) {
                  setNeedMore(false)
                  return prev
                }
                return Object.assign({}, prev, {
                  moreSessions: [
                    ...prev.moreSessions,
                    ...fetchMoreResult.moreSessions,
                  ],
                })
              },
            })
          }}
        >
          Load More
        </LoadMore>
      )}
    </Results>
  )
}

const MORE_GAMES = gql`
  query($search: String!, $skip: Int) {
    moreGames(search: $search, skip: $skip) {
      tags
      name
    }
  }
`

function GameMore(props) {
  const [needMore, setNeedMore] = useState(true)
  const { data, loading, fetchMore } = useQueryNotBugged(MORE_GAMES, {
    variables: { search: props.search },
  })
  useEffect(() => {
    if (!loading && data && data.moreGames.length < 10) {
      setNeedMore(false)
    }
  }, [data])
  return (
    <Results>
      <BigContainer>
        <ChevronLeft onClick={() => props.setMore(null)} />
        <BigType>Users</BigType>
      </BigContainer>
      {!loading &&
        data &&
        data.moreGames.map(game => (
          <SearchResultGame game={game.name} tags={game.tags} />
        ))}
      {!loading && needMore && (
        <LoadMore
          onClick={async () => {
            await fetchMore({
              variables: {
                search: props.search,
                skip: data.moreGames.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (fetchMoreResult.moreGames.length < 10) {
                  setNeedMore(false)
                  return prev
                }
                if (fetchMoreResult.moreGames.length === 0) {
                  setNeedMore(false)
                  return prev
                }
                return Object.assign({}, prev, {
                  moreGames: [...prev.moreGames, ...fetchMoreResult.moreGames],
                })
              },
            })
          }}
        >
          Load More
        </LoadMore>
      )}
    </Results>
  )
}

const MORE_USERS = gql`
  query($search: String!, $skip: Int) {
    moreUsers(search: $search, skip: $skip) {
      role
      numSessions
      username
      name
    }
  }
`

function UserMore(props) {
  const [needMore, setNeedMore] = useState(true)
  const { data, loading, fetchMore } = useQueryNotBugged(MORE_USERS, {
    variables: { search: props.search },
  })
  useEffect(() => {
    if (!loading && data && data.moreUsers.length < 10) {
      setNeedMore(false)
    }
  }, [data])
  return (
    <Results>
      <BigContainer>
        <ChevronLeft onClick={() => props.setMore(null)} />
        <BigType>Users</BigType>
      </BigContainer>
      {!loading &&
        data &&
        data.moreUsers.map(user => (
          <SearchResultUser
            username={user.username}
            name={user.name}
            gamer={user.role === 'GAMER'}
            numSessions={user.numSessions}
          />
        ))}
      {!loading && needMore && (
        <LoadMore
          onClick={async () => {
            await fetchMore({
              variables: {
                search: props.search,
                skip: data.moreUsers.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (fetchMoreResult.moreUsers.length < 10) {
                  setNeedMore(false)
                  return prev
                }
                if (fetchMoreResult.moreUsers.length === 0) {
                  setNeedMore(false)
                  return prev
                }
                return Object.assign({}, prev, {
                  moreUsers: [...prev.moreUsers, ...fetchMoreResult.moreUsers],
                })
              },
            })
          }}
        >
          Load More
        </LoadMore>
      )}
    </Results>
  )
}
