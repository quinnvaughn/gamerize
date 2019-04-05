import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { useStore } from 'react-hookstore'
import gql from 'graphql-tag'

//local imports
import GamerDay from '../Components/GamerDay'
import GamerSessionCard from '../Components/GamerSessionCard'
import SessionsIsGoingOn from '../Components/SessionsIsGoingOn'
import BigGamerCalendar from '../Components/BigGamerCalendar'
import GamerSelectedSession from '../Components/GamerSelectedSession'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'
import NextSession from '../Components/NextSession'

const PageContainer = styled.div`
  height: 100%;
`

const Content = styled.div`
  max-width: none;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
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
const SessionInfo = styled.div`
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

const Top = styled.div`
  margin-bottom: 2rem;
`

const Bottom = styled.div``

const MONTH = 'MONTH'

const TODAY = 'TODAY'

const MY_SESSIONS = gql`
  {
    me {
      id
      setup
      sessionIsGoingOn {
        session {
          slots
          startTime
          gamingSession {
            system
            game {
              name
              launcher
            }
          }
          endTime
          players {
            player {
              gamertags {
                psn
                xbl
                nso
                pc {
                  epic
                  origin
                  steam
                  bethesda
                  battlenet
                }
              }
            }
          }
        }
        goingOn
      }
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
    mySlotsToday {
      id
      startTime
      endTime
      slots
      finished
      players {
        player {
          username
        }
      }
      gamingSession {
        length
        game {
          name
        }
      }
    }
  }
`
export default function GamerDashboardCalendar(props) {
  const [dayOrMonth, setDayOrMonth] = useState(TODAY)
  const { data, loading, refetch } = useQuery(MY_SESSIONS, {
    pollInterval: 5000,
  })
  const [state] = useStore(gamerSessionSelection)
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
          {dayOrMonth === MONTH ? (
            <BigGamerCalendar />
          ) : loading ? null : (
            data.me &&
            data.me.setup &&
            data.mySlotsToday && <GamerDay todaySessions={data.mySlotsToday} />
          )}
        </LeftSide>
        <RightSide>
          <Top>
            <SessionInfo>Time Slots Info</SessionInfo>
            {loading
              ? null
              : data.me &&
                data.me.sessionIsGoingOn &&
                data.me.sessionIsGoingOn.goingOn === true && (
                  <SessionsIsGoingOn
                    refetch={refetch}
                    currentSession={data.me.sessionIsGoingOn.session}
                  />
                )}
            <NextSession />
          </Top>
          <Bottom>
            <YourSessions>Your sessions</YourSessions>
            <Info>
              These are all your sessions. Click on them to get options to add
              them to your calendar. Edit them in the sessions tab.
            </Info>
            {loading
              ? null
              : data.me &&
                data.me.sessions &&
                data.me.setup &&
                data.me.sessions.map(session => (
                  <GamerSessionCard
                    session={session}
                    key={session.id}
                    setup={data.me.setup}
                    refetch={refetch}
                  />
                ))}
          </Bottom>
        </RightSide>
      </Content>
      {state.selectedSession && <GamerSelectedSession refetch={refetch} />}
    </PageContainer>
  )
}
