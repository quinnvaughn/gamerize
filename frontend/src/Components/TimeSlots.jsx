import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'

//local
import Modal from './Modal'
import Calendar from './TimeSlotsCalendar'
import TimeSlotsHours from './TimeSlotsHours'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  position: relative;
`

const TimeSlotLabel = styled.label`
  font-size: 17px;
  font-weight: 400;
  padding: 0 0 4px;
`

const TimeSlot = styled.span`
  font-size: 12px;
  overflow-wrap: break-word;
`

const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
`

const SelectionButton = styled.button`
  border: 1px solid #dddfe2;
  padding: 10px;
  display: flex;
  width: 100%;
  height: 40px !important;
  align-items: cimport Calender from './Calendar';
enter;
  justify-content: space-between;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  background: white;
`

const SelectedChoice = styled.span``

const ArrowRight = styled(FaArrowRight)`
  color: black;
  font-size: 14px;
  align-self: end;
`

export default function TimeSlots(props) {
  const [showModal, setshowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  return (
    <Container>
      <TimeSlotLabel>
        <TimeSlot>Time Slots</TimeSlot>
      </TimeSlotLabel>
      <SelectionContainer>
        <SelectionButton onClick={() => setshowModal(!showModal)}>
          <SelectedChoice />
          <ArrowRight />
        </SelectionButton>
      </SelectionContainer>
      {showModal && (
        <Modal
          onRequestClose={() => {
            setshowModal(!showModal)
            setSelectedDay(null)
          }}
        >
          {selectedDay ? (
            <TimeSlotsHours
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
