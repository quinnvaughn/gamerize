import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { useStore } from 'react-hookstore'
import gql from 'graphql-tag'

//local imports
import GamerDay from '../Components/GamerDay'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import GamerSessionCard from '../Components/GamerSessionCard'
import SessionsIsGoingOn from '../Components/SessionsIsGoingOn'
import BigGamerCalendar from '../Components/BigGamerCalendar'
import GamerSelectedSession from '../Components/GamerSelectedSession'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'
import NextSession from '../Components/NextSession'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'

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
  height: calc(100vh - 80rem);
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
    props.active ? '2px solid #db1422' : '2px solid transparent'};
`

const Top = styled.div`
  margin-bottom: 2rem;
`

const AllSessions = styled.div`
  height: 40rem;
  overflow-y: scroll;
  border: 1px solid #ebebeb;
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

const Bottom = styled.div`
  height: 100%;
`

const MONTH = 'MONTH'

const TODAY = 'TODAY'

const MY_GAMING_SESSIONS = gql`
  {
    myGamingSessions {
      id
      title
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
    }
  }
`

const SLOTS_TODAY = gql`
  query($today: Boolean, $timeZone: String!) {
    thatDaySessions(today: $today, timeZone: $timeZone) {
      id
      startTime
      endTime
      slots
      finished
      players {
        player {
          id
          username
        }
      }
      gamingSession {
        id
        length
        game {
          id
          name
        }
      }
    }
  }
`
const ME = gql`
  {
    me {
      id
      setup
      sessionIsGoingOn {
        session {
          id
          slots
          startTime
          gamingSession {
            id
            system
            game {
              id
              name
              launcher
            }
          }
          endTime
          players {
            player {
              id
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
    }
  }
`
export default function GamerDashboardCalendar(props) {
  const [dayOrMonth, setDayOrMonth] = useState(TODAY)
  const { data, loading, refetch, error } = useQuery(ME, {
    pollInterval: 1000,
  })
  const {
    data: secondData,
    loading: secondLoading,
    refetch: secondRefetch,
    error: secondError,
  } = useQuery(MY_GAMING_SESSIONS, { pollInterval: 1000 })
  const {
    data: thirdData,
    loading: thirdLoading,
    refetch: thirdRefetch,
    error: thirdError,
  } = useQuery(SLOTS_TODAY, {
    variables: {
      today: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    pollInterval: 1000,
    skip: dayOrMonth === 'MONTH',
  })
  const [state] = useStore(gamerSessionSelection)
  const errors = error || secondError || thirdError
  return loading || secondLoading || thirdLoading ? (
    <Loading gamer />
  ) : errors ? (
    <ErrorPage errors={errors} />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
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
          ) : (
            data.me &&
            data.me.setup &&
            thirdData &&
            thirdData.thatDaySessions && (
              <GamerDay todaySessions={thirdData.thatDaySessions} />
            )
          )}
        </LeftSide>
        <RightSide>
          <Top>
            <SessionInfo>Time Slots Info</SessionInfo>
            {data.me &&
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
            <AllSessions>
              {secondData.myGamingSessions &&
                data.me.setup &&
                secondData.myGamingSessions.map((session, index) => (
                  <GamerSessionCard
                    session={session}
                    key={session.id}
                    setup={data.me.setup}
                    last={index === secondData.myGamingSessions.length - 1}
                    refetch={refetch}
                  />
                ))}
            </AllSessions>
          </Bottom>
        </RightSide>
      </Content>
      {state.selectedSession && <GamerSelectedSession refetch={refetch} />}
    </PageContainer>
  )
}
