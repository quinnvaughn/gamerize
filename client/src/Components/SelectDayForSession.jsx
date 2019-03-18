import React, { useState } from 'react'
import styled from 'styled-components'

//local imports
import GamerCalendar from './SmallGamerCalendar'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 12rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  height: 4.4rem;
  white-space: nowrap;
`

const Dropdown = styled.div`
  position: absolute;
  top: 4.4rem;
  left: 0;
`

const Date = styled.input`
  display: inline;
  border: none;
  width: 100%;
  font-size: 1.6rem;
  :focus {
    outline: none;
  }
`
export default function SelectDayForSession({ dispatch, state, type }) {
  const [dropdown, setDropdown] = useState(false)
  return (
    <Container onClick={() => setDropdown(true)}>
      <Date value={state.day} readOnly />
      {dropdown && (
        <Dropdown>
          <GamerCalendar dispatch={dispatch} setDropdown={setDropdown} />
        </Dropdown>
      )}
    </Container>
  )
}
