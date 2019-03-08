import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import dateFns from 'date-fns'

// local imports
import exampleSessions from '../data/sessions'
import SessionsContainer from '../Containers/SessionsContainer'

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
  border-bottom: ${props =>
    props.current ? '3px solid #e62739' : '1px solid #dddfe2'};
`

const Hour = styled.div`
  background: #fff;
  z-index: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  top: -0.8rem;
  position: absolute;
  color: ${props => (props.current ? '#e62739' : 'black')};
  font-weight: 600;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  font-size: 1.6rem;
  margin-left: 5rem;
  margin-right: 4rem;
`

const Session = styled.div`
  height: ${props => `${20 / (6 / props.height)}px`};
  background: ${props =>
    props.full ? '#e62739' : props.disabled ? '#dddfe2' : 'white'};
  width: 100%;
  color: ${props => (props.full || props.disabled ? 'white' : 'black')};
  border: ${props => !props.full && '1px solid #d3d3d3'};
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  z-index: 10;
  display: flex;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  top: ${props => `${(props.startTime / 60) * 100}%`};
  transition: 0.15s ease-out;
  pointer-events: ${props => (props.full || props.disabled) && 'none'};
  :hover {
    background: #dddfe2;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
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

const SnapTo = styled.div`
  position: absolute;
  top: -70px;
  left: 0;
`

export default function TodayAvailability(props) {
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
      const sessions = exampleSessions.filter(
        session => dateFns.getHours(session.timeStart) === i
      )

      hours.push(
        <Row
          key={i}
          current={dateFns.isThisHour(
            new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate(),
              i + 1
            )
          )}
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
          <Subscribe to={[SessionsContainer]}>
            {container => (
              <Sessions>
                {sessions.map(session => (
                  <Session
                    key={session.timeStart}
                    height={session.length}
                    full={session.players.length === session.slots}
                    startTime={dateFns.getMinutes(session.timeStart)}
                    onClick={() => {
                      container.setSelectedSession(session)
                      container.setShowModal(true)
                    }}
                    disabled={
                      dateFns.compareAsc(new Date(), session.timeStart) === 1
                    }
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
  return (
    <AvailabilityContainer>
      <SnapTo id="availability" />
      <Availability>Today's Availability </Availability>
      <Container>{renderHours()}</Container>
    </AvailabilityContainer>
  )
}
