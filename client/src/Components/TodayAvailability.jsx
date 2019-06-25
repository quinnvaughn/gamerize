import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import dateFns from 'date-fns'

// local imports
import SessionsContainer from '../Containers/SessionsContainer'
import { singleOrPlural } from '../utils/Strings'
import { Mixpanel } from './Mixpanel'
import { useSessions } from '../State/SessionsSelectedContext'

const Container = styled.div`
  width: 100%;
  max-width: 108rem;
  height: 60rem;
  overflow-y: scroll;
  background: #fff;
  border: 1px solid #dddfe2;
  overflow-x: hidden;
  border-radius: 4px;

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
    props.full || props.disabled
      ? 'repeating-linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)'
      : '#fccfcf'};
  width: 100%;
  color: ${props => (props.full || props.disabled ? '#dddfe2' : '#db1422')};
  border: ${props =>
    props.full || props.disabled
      ? '2px solid rgb(255, 255, 255)'
      : '1px solid #db1422'};
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  z-index: 1;
  display: flex;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  top: ${props => `${(props.startTime / 60) * 100}%`};
  transition: 0.15s ease-out;
  pointer-events: ${props => (props.full || props.disabled) && 'none'};
  :hover {
    background: #f99f9f;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
  padding-top: 1rem;
`

const AvailabilityContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  position: relative;
`

const Availability = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export default function TodayAvailability(props) {
  const [allSessions, dispatch] = useSessions()
  useEffect(() => {
    const element = document.getElementById('current')
    element.scrollIntoView()
    window.parent.scrollTo(0, 0)
  }, {})
  const renderHours = () => {
    const dateFormat = 'ha'
    const hours = []
    let selectedDate = dateFns.startOfDay(props.day)

    for (let i = 0; i < 24; i++) {
      const sessions = props.sessions.filter(
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
              ) && 'current'
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
          <Sessions>
            {sessions.map(session => (
              <Session
                key={session.startTime}
                height={session.length}
                full={session.players.length === session.slots}
                startTime={dateFns.getMinutes(session.startTime)}
                onClick={() => {
                  Mixpanel.track(
                    'Selected session straight from today availability.'
                  )
                  dispatch({
                    type: 'SET_SELECTED_SESSION',
                    payload: session,
                  })
                  dispatch({
                    type: 'SHOW_MODAL',
                  })
                }}
                disabled={session.passed}
              >
                {`${session.slots - session.players.length} ${singleOrPlural(
                  session.slots - session.players.length,
                  'spot'
                )} left`}
              </Session>
            ))}
          </Sessions>
        </Row>
      )
    }

    return <Hours>{hours}</Hours>
  }
  return (
    <AvailabilityContainer>
      <Availability>Today's availability </Availability>
      <Container>{renderHours()}</Container>
    </AvailabilityContainer>
  )
}
