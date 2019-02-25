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
  cursor: ${props => !props.taken && 'pointer'};
  background: ${props => (props.selected ? '#e62739' : '#fff')};
  font-size: 1.6rem;
  height: 4rem;
  width: 100%;
`

const Check = styled(FaCheck)`
  color: #fff;
  font-size: 1.6rem;
`

export default function Slot(props) {
  return (
    <Subscribe to={[SessionsContainer]}>
      {sessions => {
        const selected = sessions.state.selected.includes(props.value)
        return (
          <Container
            selected={selected}
            taken={props.taken}
            onClick={() => sessions.toggleSelected(props.value)}
          >
            {selected ? <Check /> : props.children}
          </Container>
        )
      }}
    </Subscribe>
  )
}
