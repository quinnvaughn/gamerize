import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'react-hookstore'

//local imports
import GamerCalendar from './GamerCalendar'
import sessionAdder from '../Stores/SessionAdderStore'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 14rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
`

const Dropdown = styled.div`
  position: absolute;
`

const Month = styled.input`
  width: 2rem;
  display: inline;
  border: none;
  font-size: 1.6rem;
  text-align: right;
  :focus {
    outline: none;
  }
`
const Day = styled.input`
  width: 2rem;
  display: inline;
  border: none;
  font-size: 1.6rem;
  text-align: right;
  :focus {
    outline: none;
  }
`
const Year = styled.input`
  margin-left: 0.3rem;
  width: 3.5rem;
  display: inline;
  border: none;
  font-size: 1.6rem;
  :focus {
    outline: none;
  }
`

const Slash = styled.div`
  margin-left: 0.3rem;
  font-size: 1.6rem;
`
export default function SelectDayForSession({dispatch, state, type}) {
  const [dropdown, setDropdown] = useState(false)
  return (
    <Container>
      <Month
        value={state.month}
        onChange={e =>
          dispatch({
            type,
            payload: { type: 'month', value: e.target.value },
          })
        }
        onClick={() =>
          state.month === '--' &&
          dispatch({ type, payload: { type: 'month', value: '' } })
        }
        onBlur={() =>
          state.month === '' &&
          dispatch({
            type,
            payload: { type: 'month', value: '--' },
          })
        }
      />
      <Slash>/</Slash>
      <Day
        value={state.day}
        onChange={e =>
          dispatch({
            type,
            payload: { type: 'day', value: e.target.value },
          })
        }
        onClick={() =>
          state.day === '--' &&
          dispatch({ type, payload: { type: 'day', value: '' } })
        }
        onBlur={() =>
          state.day === '' &&
          dispatch({ type, payload: { type: 'day', value: '--' } })
        }
      />
      <Slash>/</Slash>
      <Year
        value={state.year}
        onChange={e =>
          dispatch({
            type,
            payload: { type: 'year', value: e.target.value },
          })
        }
        onClick={() =>
          state.year === '----' &&
          dispatch({ type, payload: { type: 'year', value: '' } })
        }
        onBlur={() =>
          state.year === '' &&
          dispatch({
            type,
            payload: { type: 'year', value: '----' },
          })
        }
      />
      {dropdown && (
        <Dropdown>
          <GamerCalendar />
        </Dropdown>
      )}
    </Container>
  )
}
