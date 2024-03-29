import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'

// local imports
import SessionsContainer from '../Containers/SessionsContainer'
import { noSpaces } from '../utils/Strings'

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
  z-index: 0;
  font-size: 1.6rem;
  margin-left: 5rem;
  margin-right: 4rem;
`

const Session = styled(Link)`
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
  text-decoration: none;
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

const AvailabilityContainer = styled.div`
  width: 100%;
  padding: 2.4rem 0 4rem;
  position: relative;
`

const Availability = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

export default function GamerAvailability(props) {
  useEffect(() => {
    const element = document.getElementById('current')
    // scroll to your element
    element && element.scrollIntoView(true)
    props.setScrolledTo(true)
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
          <Subscribe to={[SessionsContainer]}>
            {container => (
              <Sessions>
                {sessions.map(session => {
                  return (
                    <Session
                      key={session.startTime}
                      height={dateFns.differenceInMinutes(
                        session.endTime,
                        session.startTime
                      )}
                      full={session.players.length === session.slots}
                      startTime={dateFns.getMinutes(session.startTime)}
                      onClick={() => {
                        container.setShowModal(true)
                        container.setSelectedSession(session)
                      }}
                      to={`/users/${props.username}/${noSpaces(
                        session.gamingSession.game.name
                      )}/${session.gamingSession.id}`}
                      disabled={session.passed || session.full}
                    >
                      {`${session.slots - session.players.length} ${
                        session.slots - session.players.length === 1
                          ? 'spot'
                          : 'spots'
                      } left - ${session.gamingSession.game.name}`}
                    </Session>
                  )
                })}
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
      <Availability>{`Availability today`} </Availability>
      <Container>{renderHours()}</Container>
    </AvailabilityContainer>
  )
}
