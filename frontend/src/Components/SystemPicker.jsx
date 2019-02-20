import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  position: relative;
`

const SystemLabel = styled.label`
  font-size: 17px;
  font-weight: 400;
  padding: 0 0 4px;
`

const System = styled.span`
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
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'cursor')};
  background: white;
`

const SelectedChoice = styled.span``

const ChevronDown = styled(FaChevronDown)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 14px;
`

const ChevronUp = styled(FaChevronUp)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 14px;
`

const SystemChoices = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  left: 0;
  padding: 10px;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  z-index: 1;
  background: white;
`

const SystemChoice = styled.div``

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
