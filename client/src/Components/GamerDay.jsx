import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import dateFns from 'date-fns'
import { useStore } from 'react-hookstore'

import useInterval from '../Hooks/useInterval'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-height: calc(100vh - 18rem);
  overflow-y: scroll;
  background: #fff;
  border: 1px solid #dddfe2;
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

const Day = styled.span`
  font-size: 3rem;
  cursor: default;
  margin-left: ${props => props.day && '-4rem'};
`

//For formatting.
const Empty = styled.div``

const Back = styled.div`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
    color: #db1422;
  }
`

const BackText = styled.span`
  font-size: 1.8rem;
  margin-left: 0.5rem;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  font-size: 1.8rem;
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
  overflow-y: hidden;
`

const SpotsAndGame = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
`

const TimeOfGame = styled.div`
  cursor: pointer;
`

export default function GamerDay(props) {
  const [time, setTime] = useState(props.day ? new Date(props.day) : new Date())
  const [state, dispatch] = useStore(gamerSessionSelection)
  useInterval(() => {
    props.day ? setTime(new Date(props.day)) : setTime(new Date())
  }, 60000)
  useEffect(() => {
    const element = document.getElementById('current')
    // scroll to your element
    element && element.scrollIntoView(true)
    window.parent.scrollTo(0, 0)
  }, {})
  const renderHeader = () => {
    const dateFormat = 'MMMM Do, YYYY'

    return (
      <Header>
        {props.day ? (
          <Back onClick={() => props.setSelectedDay(null)}>
            <ChevronLeft />
            <BackText>Back</BackText>
          </Back>
        ) : (
          <Empty />
        )}
        <Day day={props.day}>{dateFns.format(time, dateFormat)}</Day>
        <Empty />
      </Header>
    )
  }

  const renderHours = () => {
    const dateFormat = 'ha'
    const sessionFormat = 'h:mm a'
    const hours = []
    let selectedDate = dateFns.startOfDay(time)

    for (let i = 0; i < 24; i++) {
      const sessions = props.todaySessions.filter(
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
                height={dateFns.differenceInMinutes(
                  session.endTime,
                  session.startTime
                )}
                full={session.players.length === session.slots}
                startTime={dateFns.getMinutes(session.startTime)}
                onClick={() => {
                  dispatch({
                    type: 'setSelectedSession',
                    payload: session,
                  })
                }}
                disabled={session.finished}
              >
                <SpotsAndGame>{`${session.slots - session.players.length} ${
                  session.slots - session.players.length === 1
                    ? 'spot'
                    : 'spots'
                } left - ${session.gamingSession.game.name}`}</SpotsAndGame>
                <TimeOfGame>{`${dateFns.format(
                  session.startTime,
                  sessionFormat
                )} - ${dateFns.format(
                  session.endTime,
                  sessionFormat
                )}`}</TimeOfGame>
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
