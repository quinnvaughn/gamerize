import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.8rem;
  position: relative;
`

const SystemLabel = styled.label`
  font-size: 1.7rem;
  font-weight: 400;
  padding: 0 0 0.4rem;
`

const System = styled.span`
  font-size: 1.2rem;
  overflow-wrap: break-word;
`

const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
`

const SelectionButton = styled.button`
  border: 1px solid #dddfe2;
  padding: 1rem;
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'cursor')};
  background: white;
`

const SelectedChoice = styled.span`
  font-size: 1.6rem;
`

const ChevronDown = styled(FaChevronDown)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

const ChevronUp = styled(FaChevronUp)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

const SystemChoices = styled.div`
  position: absolute;
  top: 4rem;
  width: 100%;
  left: 0;
  padding: 1rem;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  z-index: 1;
  background: white;
`

const SystemChoice = styled.div`
  font-size: 1.6rem;
`

export default function SystemPicker(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <SystemLabel>
        <System>System</System>
      </SystemLabel>
      <SelectionContainer>
        <SelectionButton
          onClick={() => props.systems.length >= 1 && setOpen(!open)}
          disabled={props.systems.length <= 1}
        >
          <SelectedChoice>{props.systems[0]}</SelectedChoice>
          {open ? (
            <ChevronUp />
          ) : (
            <ChevronDown disabled={props.systems.length <= 1} />
          )}
          {open && (
            <SystemChoices>
              {props.systems.map(system => (
                <SystemChoice>{system}</SystemChoice>
              ))}
            </SystemChoices>
          )}
        </SelectionButton>
      </SelectionContainer>
    </Container>
  )
}
