import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import RetiredSessionCard from '../Components/RetiredSessionCard'
import GamerDashboardSessionsNav from '../Components/GamerDashboardSessionsNav'
import CreateSession from '../Components/CreateSession'
import Modal from '../Components/Modal'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'

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

const YourSessions = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Sessions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
`

const NewSession = styled.button`
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

const GET_ME = gql`
  {
    me {
      id
      setup
    }
  }
`

const GET_SESSIONS = gql`
  {
    myRetiredGamingSessions {
      id
      title
      launcher
      game {
        id
        name
      }
      gamers {
        id
        username
      }
      price
      length
      system
      slots
      type
    }
  }
`

export default function GamerDashboardSessions(props) {
  const [openNew, setOpenNew] = useState(false)
  const [edit, setEdit] = useState(false)
  const { data, loading, error } = useQuery(GET_ME)
  const {
    data: sessions,
    loading: secondLoading,
    refetch,
    error: secondError,
  } = useQuery(GET_SESSIONS)
  const errors = error || secondError
  return loading || secondLoading ? (
    <Loading gamer />
  ) : errors ? (
    <ErrorPage errors={errors} />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <Top>
          <YourSessions>Your Sessions</YourSessions>
          <NewSession onClick={() => setOpenNew(true)}>
            Create new session
          </NewSession>
        </Top>
        <GamerDashboardSessionsNav />
        <Sessions>
          {sessions.myRetiredGamingSessions.map(session => (
            <RetiredSessionCard
              session={session}
              refetch={refetch}
              setup={data.me.setup}
              key={session.title + session.game}
            />
          ))}
        </Sessions>
      </Content>
      {openNew && (
        <Modal onRequestClose={() => setOpenNew(false)} width={600}>
          <CreateSession refetch={refetch} setOpen={setOpenNew} />
        </Modal>
      )}
    </PageContainer>
  )
}
