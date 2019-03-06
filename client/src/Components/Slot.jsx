import React from 'react'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'
import { Subscribe } from 'unstated'

import SessionsContainer from '../Containers/SessionsContainer'

const Container = styled.div`
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${props => props.taken && 'none'};
  color: ${props => props.taken && '#dddfe2'};
  background: #fff;
  font-size: 1.6rem;
  height: 4rem;
  width: 100%;
`

const Check = styled(FaCheck)`
  font-size: 1.6rem;
  color: #e62739;
`

export default function Slot(props) {
  return (
    <Subscribe to={[SessionsContainer]}>
      {sessions => {
        const selected =
          sessions.state.addedSession.selected.filter(
            selection => selection === props.value
          ).length > 0
        return (
          <Container selected={selected} taken={props.taken}>
            {selected ? <Check /> : props.children}
          </Container>
        )
      }}
    </Subscribe>
  )
}
