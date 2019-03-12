import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { FaChevronLeft } from 'react-icons/fa'
import { Subscribe } from 'unstated'

import exampleSessions from '../data/sessions'
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
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  max-width: inherit;
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
    color: #f10e0e;
  }
`

const Day = styled.span`
  font-size: 3rem;
  cursor: default;
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
  border-bottom: ${props =>
    props.current ? '3px solid #f10e0e' : '1px solid #dddfe2'};
`

const Hour = styled.div`
  background: #fff;
  z-index: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  top: -0.8rem;
  position: absolute;
  color: ${props => (props.current ? '#f10e0e' : 'black')};
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
    props.full
      ? 'repeating-linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)'
      : '#fccfcf'};
  width: 100%;
  color: ${props => (props.full ? '#dddfe2' : '#f10e0e')};
  border: ${props =>
    props.full ? '2px solid rgb(255, 255, 255)' : '1px solid #f10e0e'};
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
    background: #f99f9f;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
`
export default function TimeSlotHours(props) {
  useEffect(() => {
    const element = document.getElementById('currentCalendar')
    element && element.scrollIntoView()
    window.parent.scrollTo(0, 0)
  }, {})
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
                    key={session.timeStart}
                    height={session.length}
                    full={session.players.length === session.slots}
                    startTime={dateFns.getMinutes(session.timeStart)}
                    onClick={() => {
                      container.setSelectedSession(session)
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
    <Container>
      {renderHeader()}
      {renderHours()}
    </Container>
  )
}
