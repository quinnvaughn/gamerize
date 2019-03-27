import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import CreatedSessionCard from '../Components/CreatedSessionCard'
import CreateSession from '../Components/CreateSession'
import Modal from '../Components/Modal'

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
  background: #f10e0e;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const GET_SESSIONS = gql`
  {
    me {
      id
      buffer
      sessions {
        id
        title
        game {
          name
        }
        gamers {
          username
        }
        price
        length
        systems
        slots
        type
      }
    }
  }
`

export default function GamerDashboardSessions(props) {
  const [openNew, setOpenNew] = useState(false)
  const [edit, setEdit] = useState(false)
  const { data, loading, refetch } = useQuery(GET_SESSIONS)
  return loading ? null : (
    <PageContainer>
      <Content>
        <Top>
          <YourSessions>Your Sessions</YourSessions>
          <NewSession onClick={() => setOpenNew(true)}>
            Create new session
          </NewSession>
        </Top>
        <Sessions>
          {data.me.sessions.map(session => (
            <CreatedSessionCard
              session={session}
              refetch={refetch}
              buffer={data.me.buffer}
              setOpen={setEdit}
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
