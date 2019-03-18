import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSortDown } from 'react-icons/fa'

//local imports
import { setMinutes } from '../utils/Dates'

const Container = styled.div`
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
`

const Hour = styled.input`
  width: 2.4rem;
  display: inline;
  border: none;
  font-size: 1.6rem;
  text-align: right;
  :focus {
    outline: none;
  }
`

const Minutes = styled.input`
  width: 2rem;
  display: inline;
  border: none;
  font-size: 1.6rem;
  :focus {
    outline: none;
  }
`

const Colon = styled.div`
  font-size: 1.6rem;
  margin-right: 0.2rem;
`

const Period = styled.div`
  position: relative;
  width: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer !important;
`

const Selection = styled.span`
  cursor: pointer;
  font-size: 1.4rem;
  margin-left: 0.5rem;
`
const Dropdown = styled.div`
  position: absolute;
  top: 1.7rem;
  left: 0.5rem;
  border-radius: 4px;
  border: 1px solid #dddfe2;
  background: #fff;
  z-index: 100;
`

const Choices = styled.div`
  background: #fff;
  padding: 0.5rem;
  font-size: 1.4rem;
  :hover {
    background: #dddfe2;
    cursor: pointer;
  }
`

const hoursRegEx = /^([1-9]|1[012])$/

export default function TimePicker({ state, dispatch, type }) {
  const onKeyDownHour = e => {
    switch (e.key) {
      case 'ArrowUp': {
        dispatch({
          type,
          payload: {
            type: 'hour',
            value:
              Number(e.target.value) + 1 === 13
                ? 1
                : Number(e.target.value) + 1,
          },
        })
        break
      }
      case 'ArrowDown': {
        dispatch({
          type,
          payload: {
            type: 'hour',
            value:
              Number(e.target.value) - 1 === 0
                ? 12
                : Number(e.target.value) - 1,
          },
        })
        break
      }
      default:
        return
    }
  }
  const onKeyDownMinutes = e => {
    switch (e.key) {
      case 'ArrowUp': {
        dispatch({
          type,
          payload: {
            type: 'minutes',
            value:
              Number(e.target.value) + 1 === 61
                ? 1
                : setMinutes(Number(e.target.value) + 1),
          },
        })
        break
      }
      case 'ArrowDown': {
        dispatch({
          type,
          payload: {
            type: 'minutes',
            value:
              Number(e.target.value) - 1 === 0
                ? 60
                : setMinutes(Number(e.target.value) - 1),
          },
        })
        break
      }
      default:
        return
    }
  }
  const [dropdown, setDropdown] = useState(false)
  return (
    <Container>
      <Hour
        onKeyDown={onKeyDownHour}
        onChange={e => {
          if (!hoursRegEx.test(Number(e.target.value)) && e.target.value !== '')
            return
          if (e.target.value === '') {
            dispatch({
              type,
              payload: { type: 'hour', value: '' },
            })
            return
          }
          dispatch({
            type,
            payload: { type: 'hour', value: Number(e.target.value) },
          })
        }}
        value={state.hour}
      />
      <Colon>:</Colon>
      <Minutes
        onKeyDown={onKeyDownMinutes}
        onChange={e => {
          if (e.target.value === '') {
            dispatch({
              type,
              payload: { type: 'minutes', value: '' },
            })
            return
          }
          dispatch({
            type,
            payload: {
              type: 'minutes',
              value: setMinutes(Number(e.target.value)),
            },
          })
        }}
        value={state.minutes}
      />
      <Period onClick={() => setDropdown(!dropdown)}>
        <Selection>{state.period}</Selection>
        {dropdown && (
          <Dropdown>
            <Choices
              onClick={() =>
                dispatch({
                  type,
                  payload: { type: 'period', value: 'a.m.' },
                })
              }
            >
              a.m.
            </Choices>
            <Choices
              onClick={() =>
                dispatch({
                  type,
                  payload: { type: 'period', value: 'p.m.' },
                })
              }
            >
              p.m.
            </Choices>
          </Dropdown>
        )}
        <FaSortDown />
      </Period>
    </Container>
  )
}
