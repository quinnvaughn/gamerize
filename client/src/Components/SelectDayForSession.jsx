import React, { useState, useRef } from 'react'
import styled from 'styled-components'

//local imports
import GamerCalendar from './SmallGamerCalendar'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.7rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 12rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  white-space: nowrap;
`

const Dropdown = styled.div`
  position: absolute;
  top: 4.4rem;
  z-index: 3;
  left: 0;
`

const Date = styled.input`
  display: inline;
  border: none;
  width: 100%;
  font-size: 1.2rem;
  :focus {
    outline: none;
  }
`
export default function SelectDayForSession({
  day,
  form: { setFieldValue },
  ...props
}) {
  const [dropdown, setDropdown] = useState(false)
  const node = useRef()
  useOnOutsideClick(node, () => {
    setDropdown(false)
  })
  return (
    <Container ref={node} onClick={() => setDropdown(true)}>
      <Date value={day} readOnly />
      {dropdown && (
        <Dropdown>
          <GamerCalendar
            setFieldValue={setFieldValue}
            setDropdown={setDropdown}
          />
        </Dropdown>
      )}
    </Container>
  )
}
