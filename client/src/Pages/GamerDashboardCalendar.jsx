import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import gql from 'graphql-tag'

//local imports
import GamerCalendar from '../Components/SmallGamerCalendar'
import GamerDay from '../Components/GamerDay'
import GamerSessionCard from '../Components/GamerSessionCard'

const PageContainer = styled.div`
  height: 100%;
`

const Content = styled.div`
  max-width: none;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 7rem;
  margin-bottom: 9rem;
  display: flex;
`

const LeftSide = styled.div`
  flex: 60%;
  margin-right: 4rem;
`

const RightSide = styled.div`
  flex: 40%;
`

const YourSessions = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Info = styled.div`
  font-weight: 400;
  line-height: 1.5em;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`

const SetButton = styled.button`
  font-size: 1.4rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
  margin-right: 1.5rem;
  font-weight: 600;
  padding: 1rem 0.8rem;
  margin-bottom: 2rem;
  background: #fff;
  outline: none;
  border: none;
  border-bottom: ${props =>
    props.active ? '2px solid #f10e0e' : '2px solid transparent'};
`

const MONTH = 'MONTH'

const TODAY = 'TODAY'

const MY_SESSIONS = gql`
  {
    me {
      id
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
      }
    }
    todaySessions {
      startTime
      endTime
      gamingSession {
        game {
          name
        }
      }
    }
  }
`
export default function GamerDashboardCalendar(props) {
  const [dayOrMonth, setDayOrMonth] = useState(TODAY)
  const { data, loading } = useQuery(MY_SESSIONS)
  console.log(data)
  return (
    <PageContainer>
      <Content>
        <LeftSide>
          <SetButton
            onClick={() => setDayOrMonth(TODAY)}
            active={dayOrMonth === 'TODAY'}
          >
            Today
          </SetButton>
          <SetButton
            onClick={() => setDayOrMonth(MONTH)}
            active={dayOrMonth === 'MONTH'}
          >
            Calendar
          </SetButton>
          {dayOrMonth === MONTH ? <GamerCalendar /> : <GamerDay />}
        </LeftSide>
        <RightSide>
          <YourSessions>Your sessions</YourSessions>
          <Info>
            These are all your sessions. Click on them to get options to add
            them to your calendar. Edit them in the sessions tab.
          </Info>
          {loading
            ? null
            : data.me.sessions.map(session => (
                <GamerSessionCard session={session} key={session.id} />
              ))}
        </RightSide>
      </Content>
    </PageContainer>
  )
}
