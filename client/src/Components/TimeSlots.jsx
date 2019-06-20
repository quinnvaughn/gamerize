import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa'

import { singleOrPlural } from '../utils/Strings'
import { useSessions } from '../State/SessionsSelectedContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  max-width: 34.6rem;
  margin-bottom: 0.8rem;
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
  const [allSessions, dispatch] = useSessions()
  return (
    <Container>
      <TimeSlotLabel>
        <TimeSlot>Time Slots</TimeSlot>
      </TimeSlotLabel>
      <SelectionContainer>
        <SelectionButton onClick={() => dispatch({ type: 'SHOW_MODAL' })}>
          <NumberOfSessions>{`${allSessions.sessions.length} ${singleOrPlural(
            allSessions.sessions,
            'session'
          )}`}</NumberOfSessions>
          <ArrowRight />
        </SelectionButton>
      </SelectionContainer>
    </Container>
  )
}
