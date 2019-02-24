import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'
import { Subscribe } from 'unstated'

//local
import Modal from './Modal'
import Calendar from './TimeSlotsCalendar'
import TimeSlotsHours from './TimeSlotsHours'
import TimeSlotSession from './TimeSlotSession'
import SessionsContainer from '../Containers/SessionsContainer'

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
  const [showModal, setshowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  return (
    <Container>
      <TimeSlotLabel>
        <TimeSlot>Time Slots</TimeSlot>
      </TimeSlotLabel>
      <SelectionContainer>
        <SelectionButton onClick={() => setshowModal(!showModal)}>
          <Subscribe to={[SessionsContainer]}>
            {sessions => (
              <NumberOfSessions>{`${
                sessions.state.selected.length
              } sessions`}</NumberOfSessions>
            )}
          </Subscribe>

          <ArrowRight />
        </SelectionButton>
      </SelectionContainer>
      {showModal && (
        <Modal
          onRequestClose={() => {
            setshowModal(!showModal)
            setSelectedDay(null)
            setSelectedSession(null)
          }}
        >
          {selectedSession ? (
            <TimeSlotSession
              selectedSession={selectedSession}
              gamer={props.gamer}
              game={props.game}
              goBack={() => setSelectedSession(null)}
            />
          ) : selectedDay ? (
            <TimeSlotsHours
              setSelectedSession={setSelectedSession}
              day={selectedDay}
              goBack={() => setSelectedDay(null)}
            />
          ) : (
            <Calendar setSelectedDay={setSelectedDay} />
          )}
        </Modal>
      )}
    </Container>
  )
}
