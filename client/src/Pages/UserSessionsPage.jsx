import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import dateFns from 'date-fns'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import MyTimeSlot from '../Components/MyTimeSlot'
import NavBar from '../Components/NavBar'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  margin: 0px auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: 160rem;
  @media (min-width: 1128px) {
    padding-left: 6.4rem;
    padding-right: 6.4rem;
  }
`

const Upcoming = styled.div`
  margin-top: 3.2rem;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  @media (min-width: 1128px) {
    margin-top: 5.6rem;
    margin-bottom: 5.6rem;
  }
`

const UpcomingSessions = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  word-wrap: break-word;
  margin-bottom: 3.2rem;
`

const NegativeMargin = styled.div`
  margin-left: -0.8rem;
  margin-right: -0.8rem;
  width: 100%;
  overflow: hidden;
`

const UpcomingContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`

const Previous = styled.div`
  margin-top: 3.2rem;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  width: 100%;
  @media (min-width: 1128px) {
    margin-top: 5.6rem;
    margin-bottom: 5.6rem;
  }
`

const PreviousSessions = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  word-wrap: break-word;
  margin-bottom: 3.2rem;
`

const PreviousContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`

const MY_SESSIONS = gql`
  {
    me {
      id
      timeSlotsBooked {
        timeslot {
          gamingSession {
            id
            gamers {
              name
            }
            game {
              name
            }
            creator {
              username
            }
          }
          startTime
        }
      }
    }
  }
`

export default function UserSessionsPage(props) {
  const { data, loading } = useQuery(MY_SESSIONS)
  const sessions =
    !loading &&
    _(data.me.timeSlotsBooked)
      .groupBy(timeslot =>
        dateFns.isAfter(timeslot.timeslot.startTime, new Date())
      )
      .value()
  let upcoming = !loading && sessions.true
  let previous = !loading && sessions.false
  if (!loading && upcoming) {
    upcoming = upcoming.sort((a, b) => {
      const firstDate = new Date(a.timeslot.startTime)
      const secondDate = new Date(b.timeslot.startTime)
      return firstDate - secondDate
    })
  }
  if (!loading && previous) {
    previous = previous.sort((a, b) => {
      console.log(a, b)
      const firstDate = new Date(a.timeslot.startTime)
      const secondDate = new Date(b.timeslot.startTime)
      return secondDate - firstDate
    })
  }
  console.log(previous)
  return loading ? null : (
    <PageContainer>
      <NavBar />
      <Content>
        <Upcoming>
          <UpcomingSessions>Upcoming sessions</UpcomingSessions>
          <NegativeMargin>
            <UpcomingContent>
              {_.map(upcoming, timeslot => (
                <MyTimeSlot timeslot={timeslot.timeslot} />
              ))}
            </UpcomingContent>
          </NegativeMargin>
        </Upcoming>
        <Previous>
          <PreviousSessions>Sessions you've played</PreviousSessions>
          <NegativeMargin>
            <PreviousContent>
              {_.map(previous, timeslot => (
                <MyTimeSlot timeslot={timeslot.timeslot} />
              ))}
            </PreviousContent>
          </NegativeMargin>
        </Previous>
      </Content>
    </PageContainer>
  )
}
