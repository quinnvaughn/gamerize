import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'

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
  z-index: -1;
  overflow-x: hidden;
  border-radius: 4px;
`

const Row = styled.div`
  margin: 0;
  padding: 0px 0px 0px 2rem;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  :last-child {
    border-bottom: none;
  }
  z-index: -1;
`

const Hour = styled.div`
  height: 100%;
  display: flex;
  width: 4rem;
  align-items: center;
  padding-right: 2rem;
  border-right: 1px solid #dddfe2;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  font-size: 1.6rem;
`

const Session = styled(Link)`
  height: ${props => `${20 / (6 / props.height)}px`};
  background: ${props =>
    props.full ? '#e62739' : props.disabled ? '#dddfe2' : 'white'};
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

const AvailabilityContainer = styled.div`
  width: 100%;
  padding: 2.4rem 0 4rem;
  border-bottom: 1px solid #dddfe2;
  position: relative;
`

const Availability = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

//const noSpaces = string => string.replace(/ /g, '_')

export default function GamerAvailability(props) {
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
        <Row key={i}>
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
                      container.setShowModal(true)
                      container.setSelectedSession(session)
                    }}
                    to={`/users/${props.username}/${session.game}`}
                    disabled={
                      dateFns.compareAsc(new Date(), session.timeStart) === 1
                    }
                  >
                    {`${session.slots - session.players.length} ${
                      session.slots - session.players.length === 1
                        ? 'spot'
                        : 'spots'
                    } left - ${session.game}`}
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
      <Availability>{`Availability Today`} </Availability>
      <Container>{renderHours()}</Container>
    </AvailabilityContainer>
  )
}
