import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import CreatedSessionCard from '../Components/CreatedSessionCard'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
  display: flex;
`

const LeftSide = styled.div`
  flex: 30%;
  margin-right: 4rem;
`

const RightSide = styled.div`
  flex: 40%;
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
  const { data, loading, refetch } = useQuery(GET_SESSIONS)
  return loading ? null : (
    <PageContainer>
      <Content>
        <LeftSide>
          {data.me.sessions.map(session => (
            <CreatedSessionCard
              session={session}
              refetch={refetch}
              buffer={data.me.buffer}
              key={session.title + session.game}
            />
          ))}
        </LeftSide>
        <RightSide />
      </Content>
    </PageContainer>
  )
}
