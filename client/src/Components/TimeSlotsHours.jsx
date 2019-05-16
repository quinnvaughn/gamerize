import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { FaChevronLeft } from 'react-icons/fa'
import { Subscribe } from 'unstated'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { MdClose } from 'react-icons/md'
import { withRouter } from 'react-router-dom'

import SessionsContainer from '../Containers/SessionsContainer'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 108rem;
  background: #fff;
  border: 1px solid #dddfe2;
`

const Header = styled.div`
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 4rem 2rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 3rem;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  max-width: inherit;
  position: sticky;
  align-items: center;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.8rem;
  color: black;
  :hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: #db1422;
  }
`

const Day = styled.span`
  font-size: 3rem;
  cursor: default;
  margin-left: ${props => props.day && '-4rem'};
`

//For formatting.
const Empty = styled.div``

const Row = styled.div`
  margin: 0;
  padding: 0px 0px 0px 2rem;
  height: 20rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-top: ${props =>
    props.first
      ? props.current
        ? '3px solid #db1422'
        : '1px solid #dddfe2'
      : null};
  border-bottom: ${props =>
    props.current && !props.first ? '3px solid #db1422' : '1px solid #dddfe2'};
`

const Hour = styled.div`
  background: #fff;
  z-index: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  top: -0.8rem;
  position: absolute;
  color: ${props => (props.current ? '#db1422' : 'black')};
  font-weight: 600;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1.6rem;
  margin-left: 5rem;
  margin-right: 4rem;
`

const Session = styled.div`
  height: ${props => `${20 / (6 / props.height)}px`};
  background: ${props =>
    props.disabled
      ? 'repeating-linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)'
      : '#fccfcf'};
  width: 100%;
  color: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  border: ${props =>
    props.disabled ? '2px solid rgb(255, 255, 255)' : '1px solid #db1422'};
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  z-index: 10;
  display: flex;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: ${props => `${(props.startTime / 60) * 100}%`};
  transition: 0.15s ease-out;
  pointer-events: ${props => props.disabled && 'none'};
  :hover {
    background: #f99f9f;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
  padding-top: 1rem;
`

const Exit = styled(MdClose)`
  font-size: 3rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
  :hover {
    color: #db1422;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
  background: #fff;
`

const GAMER_SESSIONS_SPECIFIC_DAY = gql`
  query($day: DateTime!, $gamer: String!) {
    gamerSessionsSpecificDay(day: $day, gamer: $gamer) {
      startTime
      endTime
      length
      slots
      id
      full
      passed
      gamingSession {
        system
        game {
          launcher
        }
      }
      players {
        player {
          username
        }
      }
    }
  }
`

function TimeSlotHours(props) {
  const { data, loading } = useQuery(GAMER_SESSIONS_SPECIFIC_DAY, {
    variables: {
      day: props.day,
      gamer: props.match.params.user,
    },
  })
  useEffect(() => {
    const element = document.getElementById('currentCalendar')
    element && element.scrollIntoView()
    setTimeout(() => {
      window.scrollBy(0, -30)
    }, 500)
    window.parent.scrollTo(0, 0)
  }, [data])
  const renderHeader = () => {
    const dateFormat = 'MMMM Do, YYYY'

    return (
      <Header>
        <ChevronLeft onClick={props.goBack} />
        <Day>{dateFns.format(props.day, dateFormat)}</Day>
        <Empty />
      </Header>
    )
  }

  const renderHours = () => {
    const dateFormat = 'ha'
    const hours = []
    let selectedDate = dateFns.startOfDay(props.day)

    for (let i = 0; i < 24; i++) {
      const sessions = data.gamerSessionsSpecificDay.filter(
        session => dateFns.getHours(session.startTime) === i
      )

      hours.push(
        <Row
          key={i}
          first={i === 0}
          current={
            i === 0
              ? dateFns.isThisHour(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    i
                  )
                )
              : dateFns.isThisHour(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    i + 1
                  )
                )
          }
        >
          <Hour
            id={
              dateFns.isThisHour(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate(),
                  i
                )
              ) &&
              dateFns.isToday(new Date(selectedDate)) &&
              'currentCalendar'
            }
            current={dateFns.isThisHour(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                i
              )
            )}
          >
            {dateFns.format(dateFns.addHours(selectedDate, i), dateFormat)}
          </Hour>
          <Subscribe to={[SessionsContainer]}>
            {container => (
              <Sessions>
                {sessions.map(session => (
                  <Session
                    key={session.startTime}
                    height={dateFns.differenceInMinutes(
                      session.endTime,
                      session.startTime
                    )}
                    full={session.players.length === session.slots}
                    startTime={dateFns.getMinutes(session.startTime)}
                    onClick={() => {
                      container.setSelectedSession(session)
                    }}
                    disabled={session.passed || session.full}
                  >
                    {`${session.slots - session.players.length} ${
                      session.slots - session.players.length === 1
                        ? 'spot'
                        : 'spots'
                    } left`}
                  </Session>
                ))}
              </Sessions>
            )}
          </Subscribe>
        </Row>
      )
    }

    return <Hours>{hours}</Hours>
  }
  return loading ? null : (
    <Container>
      <ExitContainer>
        <Exit onClick={props.close} />
      </ExitContainer>
      {renderHeader()}
      {renderHours()}
    </Container>
  )
}

export default withRouter(TimeSlotHours)
