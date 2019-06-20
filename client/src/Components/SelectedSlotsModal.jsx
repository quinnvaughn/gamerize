import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'

import SimpleModal from './Modal'
import { useSessions } from '../State/SessionsSelectedContext'

const Content = styled.div`
  width: 100%;
  padding: 2rem;
`

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const Session = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid #ebebeb;
  border-radius: 4px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Caption = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Time = styled.div`
  font-size: 1.8rem;
`

const Slots = styled.div`
  font-size: 1.8rem;
`

const Players = styled.div`
  font-size: 1.8rem;
`

const RemoveTimeSlot = styled.button`
  width: 100%;
  margin-top: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  flex: 1;
  color: white;
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  line-height: 2.4rem;
  padding: 1rem 2.2rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  pointer-events: ${props => props.disabled && 'none'};
`

export default function SelectedSlotsModal(props) {
  const [sessions, dispatch] = useSessions()

  const timeFormat = 'h:mm aa'
  return (
    <SimpleModal
      onRequestClose={() => {
        dispatch({ type: 'CLOSE_SELECTED_SLOTS_MODAL' })
      }}
    >
      <Content>
        <Title>Your Selected Timeslots</Title>
        {sessions.sessions.map(session => (
          <Session>
            <Container>
              <Caption>Start Time</Caption>
              <Time>{dateFns.format(session.startTime, timeFormat)}</Time>
            </Container>
            <Container>
              <Caption>Slots</Caption>
              <Slots>{session.slots}</Slots>
            </Container>
            <Container>
              <Caption>Players</Caption>
              <Players>{session.players}</Players>
            </Container>
            <Container>
              <RemoveTimeSlot
                onClick={() =>
                  dispatch({ type: 'REMOVE_SESSION', payload: session.id })
                }
              >
                Remove Timeslot
              </RemoveTimeSlot>
            </Container>
          </Session>
        ))}
      </Content>
    </SimpleModal>
  )
}
