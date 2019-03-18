import React, { useReducer, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import dateFns from 'date-fns'

//local imports
import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import GamerSessionCardFront from './GamerSessionCardFront'
import GamerSessionCardBack from './GamerSessionCardBack'
import { setAMPM, setMinutes, addMinutes, addMore } from '../utils/Dates'

const Container = styled.div``

const dateFormat = 'MM/DD/YYYY'

const day = dateFns.format(new Date(), dateFormat)

const initialState = {
  flip: false,
  addState: null,
  loading: false,
  msg: null,
  addOne: {
    hour: addMore(45, 0),
    minutes: setMinutes(addMinutes(new Date(), 15)),
    period: setAMPM(new Date().getHours()),
  },
  addBulk: {
    start: {
      hour: addMore(45, 0),
      minutes: setMinutes(addMinutes(new Date(), 15)),
      period: setAMPM(new Date().getHours()),
    },
    end: {
      hour: addMore(45, 1),
      minutes: setMinutes(addMinutes(new Date(), 15)),
      period: setAMPM(new Date().getHours()),
    },
  },
  day,
}

function reducer(state, action) {
  switch (action.type) {
    case 'flip':
      return { ...state, flip: action.payload }
    case 'loading':
      return { ...state, loading: action.payload }
    case 'setMsg':
      return { ...state, msg: action.payload }
    case 'addState':
      return { ...state, addState: action.payload }
    case 'clearState':
      return { ...initialState }
    case 'setAddOne':
      return {
        ...state,
        addOne: {
          ...state.addOne,
          [action.payload.type]: action.payload.value,
        },
      }
    case 'setDate':
      return {
        ...state,
        day: action.payload,
      }
    case 'setAddBulkStart':
      return {
        ...state,
        addBulk: {
          ...state.addBulk,
          start: {
            ...state.addBulk.start,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'setAddBulkEnd':
      return {
        ...state,
        addBulk: {
          ...state.addBulk,
          end: {
            ...state.addBulk.end,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'setAddDay':
      return {
        ...state,
        addDay: {
          ...state.addDay,
          [action.payload.type]: action.payload.value,
        },
      }
    default:
      throw new Error()
  }
}

export default function GamerSessionCard({ session }) {
  const node = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearAndFlip = () => {
    dispatch({ type: 'clearState' })
    dispatch({ type: 'flip', payload: false })
    dispatch({ type: 'addState', payload: null })
  }
  useOnOutsideClick(
    node,
    useCallback(() => {
      clearAndFlip()
    }, [])
  )
  return (
    <Container ref={node}>
      <ReactCardFlip isFlipped={state.flip} flipDirection="horizontal">
        <GamerSessionCardFront
          session={session}
          dispatch={dispatch}
          key="front"
        />
        <GamerSessionCardBack
          session={session}
          dispatch={dispatch}
          state={state}
          key="back"
        />
      </ReactCardFlip>
    </Container>
  )
}
