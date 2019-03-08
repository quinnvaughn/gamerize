import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { FaChevronLeft } from 'react-icons/fa'

import exampleSessions from '../data/sessions'

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
  padding: 0px 0px 0px 4rem;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  :last-child {
    border-bottom: none;
  }
`

const Hour = styled.div`
  height: 100%;
  display: flex;
  width: 6rem;
  align-items: center;
  padding-right: 1rem;
  border-right: 1px solid #dddfe2;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1.6rem;
`

const Session = styled.div`
  height: ${props => `${20 / (6 / props.height)}px`};
  background: ${props =>
    props.full ? '#f10e0e' : props.disabled ? '#dddfe2' : 'white'};
  width: 100%;
  color: ${props => (props.full || props.disabled ? 'white' : 'black')};
  border: ${props => !props.full && '1px solid #d3d3d3'};
  cursor: pointer;
  position: absolute;
  z-index: 0;
  display: flex;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  top: ${props => `${(props.startTime / 60) * 100}%`};
  transition: 0.15s ease-out;
  pointer-events: ${props => (props.full || props.disabled) && 'none'};
  :hover {
    transform: scale(1.05);
    transition: 0.25s ease-out;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
`
export default function TimeSlotHours(props) {
  useEffect(() => {
    document.getElementById('modal').scrollTop =
      document.getElementById('current').offsetTop - 35
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
        >
          <Hour>
            {dateFns.format(dateFns.addHours(selectedDate, i), dateFormat)}
          </Hour>
          <Sessions>
            {sessions.map(session => (
              <Session
                key={session.timeStart}
                height={session.length}
                full={session.players.length === session.slots}
                startTime={dateFns.getMinutes(session.timeStart)}
                onClick={() => {
                  props.setSelectedSession(session)
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
