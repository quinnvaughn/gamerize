import React, { useState, Fragment, useRef } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import SessionsContainer from '../Containers/SessionsContainer'
import { Subscribe } from 'unstated'
import _ from 'lodash'

import { useSessions } from '../State/SessionsSelectedContext'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

const Container = styled.div`
  width: 100%;
`
const SelectionButton = styled.div`
  border: 1px solid #dddfe2;
  padding: 1rem;
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  border-radius: 4px;
  cursor: pointer;
  background: white;
  margin-left: 0.5rem;
  position: relative;
`

const Dropdown = styled.div`
  top: 3.9rem;
  position: absolute;
  width: 100%;
  left: 0;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  background: white;
`

const DropdownItem = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  padding: 1rem;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: #dddfe2;
  }
`

const Number = styled.span`
  font-size: 1.4rem;
  margin-right: 0.8rem;
  margin-left: 0.4rem;
`

const ChevronDown = styled(FaChevronDown)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

const ChevronUp = styled(FaChevronUp)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

export default function SlotOptionsDropdown(props) {
  const [sessions, dispatch] = useSessions()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnOutsideClick(node, () => {
    setOpen(false)
  })
  return (
    <Container ref={node}>
      <SelectionButton
        onClick={() => {
          setOpen(!open)
        }}
      >
        <Number>
          {props.slots
            ? sessions.sessionToBeAdded.slots
            : sessions.sessionToBeAdded.players}
        </Number>
        {open ? <ChevronUp /> : <ChevronDown />}
        {open && (
          <Dropdown>
            {_.times(sessions.sessionToBeAdded.availableSlots + 1, index => {
              return (
                <DropdownItem
                  onClick={() => {
                    props.slots
                      ? dispatch({ type: 'ADD_SLOTS', payload: index })
                      : dispatch({
                          type: 'ADD_PLAYERS',
                          payload: index,
                        })
                  }}
                >
                  {index}
                </DropdownItem>
              )
            })}
          </Dropdown>
        )}
      </SelectionButton>
    </Container>
  )
}
