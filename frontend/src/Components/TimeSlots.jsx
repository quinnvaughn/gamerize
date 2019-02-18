import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'

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
  border: 1px solid #d3d3d3;
  padding: 10px;
  display: flex;
  width: 100%;
  height: 40px !important;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'cursor')};
  background: white;
`

const SelectedChoice = styled.span``

const ArrowRight = styled(FaArrowRight)`
  color: black;
  font-size: 14px;
  align-self: end;
`

export default function TimeSlots(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <TimeSlotLabel>
        <TimeSlot>Time Slots</TimeSlot>
      </TimeSlotLabel>
      <SelectionContainer>
        <SelectionButton onClick={() => setOpen(!open)}>
          <SelectedChoice />
          <ArrowRight />
        </SelectionButton>
      </SelectionContainer>
    </Container>
  )
}
