import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'
import { Subscribe } from 'unstated'

//local
import Modal from './Modal'
import Calendar from './TimeSlotsCalendar'
import TimeSlotsHours from './TimeSlotsHours'
import TimeSlotSession from './TimeSlotSession'
import SessionsContainer from '../Containers/SessionsContainer'
import { singleOrPlural } from '../utils/Strings'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.8rem;
  position: relative;
  max-width: 34.6rem;
`

const TimeSlotLabel = styled.label`
  font-size: 1.7rem;
  font-weight: 400;
  padding: 0 0 0.4rem;
`

const TimeSlot = styled.span`
  font-size: 1.2rem;
  overflow-wrap: break-word;
`

const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
`

const SelectionButton = styled.button`
  border: 0.1rem solid #dddfe2;
  padding: 1rem;
  display: flex;
  width: 100%;
  height: 4rem !important;
  align-items: center;
  justify-content: space-between;
  color: black;
  border-radius: 0.4rem;
  cursor: pointer;
  background: white;
`

const ArrowRight = styled(FaArrowRight)`
  color: black;
  font-size: 1.4rem;
  align-self: end;
`

const NumberOfSessions = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`

export default function TimeSlots(props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, {})
  return (
    <Container>
      <TimeSlotLabel>
        <TimeSlot>Time Slots</TimeSlot>
      </TimeSlotLabel>
      <SelectionContainer>
        <Subscribe to={[SessionsContainer]}>
          {sessions => (
            <SelectionButton
              onClick={() => sessions.setShowModal(!sessions.state.showModal)}
            >
              <NumberOfSessions>{`${
                sessions.state.sessions.length
              } ${singleOrPlural(
                sessions.state.sessions,
                'session'
              )}`}</NumberOfSessions>
              <ArrowRight />
            </SelectionButton>
          )}
        </Subscribe>
      </SelectionContainer>
      <Subscribe to={[SessionsContainer]}>
        {sessions =>
          sessions.state.showModal && (
            <Modal
              onRequestClose={() => {
                sessions.setShowModal(!sessions.state.showModal)
                sessions.setSelectedDay(null)
                sessions.setSelectedSession(null)
              }}
            >
              {sessions.state.selectedSession ? (
                <TimeSlotSession
                  selectedSession={sessions.state.selectedSession}
                  gamer={props.gamer}
                  game={props.game}
                  goBack={() => sessions.goBack()}
                />
              ) : sessions.state.selectedDay ? (
                <TimeSlotsHours
                  setSelectedSession={sessions.setSelectedSession}
                  day={sessions.state.selectedDay}
                  goBack={() => sessions.setSelectedDay(null)}
                />
              ) : (
                <Calendar setSelectedDay={sessions.setSelectedDay} />
              )}
            </Modal>
          )
        }
      </Subscribe>
    </Container>
  )
}
