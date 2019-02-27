import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Container = styled.div`
  position: relative;
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
`

const Dropdown = styled.div`
  top: 4rem;
  position: absolute;
  width: 100%;
  left: 0;
  padding: 1rem;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  background: white;
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
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <SelectionButton
        onClick={() => {
          setOpen(!open)
        }}
      >
        <Number>1</Number>
        {open ? <ChevronUp /> : <ChevronDown />}
        {open && <Dropdown>This many players</Dropdown>}
      </SelectionButton>
    </Container>
  )
}
