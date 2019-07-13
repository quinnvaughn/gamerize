import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import { useStore } from 'react-hookstore'
import gql from 'graphql-tag'
import dateFns from 'date-fns'

//local imports
import GamerDay from '../Components/GamerDay'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import SessionsIsGoingOn from '../Components/SessionsIsGoingOn'
import GamerSelectedSession from '../Components/GamerSelectedSession'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'
import NextSession from '../Components/NextSession'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'
import GamerCalendar from '../Components/GamerCalendar'
import { useGamerCalendar } from '../State/GamerCalendarContext'

const PageContainer = styled.div`
  height: 100%;
`

const Content = styled.div`
  max-width: none;
  margin: 0 auto;
  display: flex;
`

const Left = styled.div`
  flex: 60%;
`

const Right = styled.div`
  flex: 40%;
  background: #f8f8f8;
`

const Date = styled.div`
  padding: 2rem;
`

const DayOfWeek = styled.div`
  color: #bcbcbc;
  font-size: 3rem;
`
const SelectedDay = styled.div`
  font-size: 3rem;
  color: black;
  font-weight: 700;
`

const Year = styled.div`
  color: #bcbcbc;
  font-size: 3rem;
  font-weight: 600;
`

const AddTimeSlots = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddTimeSlotsText = styled.span`
  font-size: 2rem;
  :hover {
    cursor: pointer;
    color: #db1422;
  }
`

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
  query($day: DateTime!, $timeZone: String!) {
    thatDaySessions(day: $day, timeZone: $timeZone) {
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
  const [gamerCalendar] = useGamerCalendar()
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
      day: gamerCalendar.selectedDay,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    pollInterval: 1000,
  })
  const [state] = useStore(gamerSessionSelection)
  const errors = error || secondError || thirdError
  const dayOfWeek = 'dddd'
  const date = 'D MMMM'
  const year = 'YYYY'
  return loading || secondLoading ? (
    <Loading gamer />
  ) : errors ? (
    <ErrorPage errors={errors} />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <Left>
          <Date>
            <DayOfWeek>
              {dateFns.format(gamerCalendar.selectedDay, dayOfWeek)}
            </DayOfWeek>
            <SelectedDay>
              {dateFns.format(gamerCalendar.selectedDay, date)}
            </SelectedDay>
            <Year>{dateFns.format(gamerCalendar.selectedDay, year)}</Year>
          </Date>
          {data.me &&
            data.me.setup &&
            thirdData &&
            thirdData.thatDaySessions && (
              <GamerDay
                todaySessions={thirdData.thatDaySessions}
                loading={thirdLoading}
              />
            )}
        </Left>
        <Right>
          <GamerCalendar />
          {data.me &&
            data.me.sessionIsGoingOn &&
            data.me.sessionIsGoingOn.goingOn === true && (
              <SessionsIsGoingOn
                refetch={refetch}
                currentSession={data.me.sessionIsGoingOn.session}
              />
            )}
          <NextSession />
          <AddTimeSlots>
            <AddTimeSlotsText>Add Timeslots</AddTimeSlotsText>
          </AddTimeSlots>
        </Right>
        {/* <Top>
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
        </Bottom> */}
      </Content>
      {state.selectedSession && <GamerSelectedSession refetch={refetch} />}
    </PageContainer>
  )
}
