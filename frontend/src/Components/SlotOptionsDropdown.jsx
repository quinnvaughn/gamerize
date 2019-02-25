import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
`

const SelectionContainer = styled.button`
  border: 1px solid #dddfe2;
  outline: 0;
  padding: 0.5rem;
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  color: black;
  border-radius: 4px;
  background: white;
  font-size: 1.6rem;
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

export default function SlotOptionsDropdown(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <SelectionContainer onClick={() => setOpen(!open)}>
        1{open && <Dropdown>This many players</Dropdown>}
      </SelectionContainer>
    </Container>
  )
}
