import React from 'react'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'

import { useSessions } from '../State/SessionsSelectedContext'

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
  color: #db1422;
`

export default function Slot(props) {
  const [sessions] = useSessions()
  const selected = sessions.sessionToBeAdded >= props.index
  return (
    <Container selected={selected} taken={props.taken}>
      {selected ? <Check /> : props.children}
    </Container>
  )
}
