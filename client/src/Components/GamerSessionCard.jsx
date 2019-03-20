import React, { useReducer, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import dateFns from 'date-fns'

//local imports
import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import GamerSessionCardFront from './GamerSessionCardFront'
import GamerSessionCardBack from './GamerSessionCardBack'
import { setAMPM, setMinutes, addMinutes, set12Hours } from '../utils/Dates'

const Container = styled.div`
  position: relative;
  z-index: ${props => props.over && 3};
`

const dateFormat = 'MM/DD/YYYY'

const day = dateFns.format(new Date(), dateFormat)

const initialState = {
  flip: false,
  addState: null,
  loading: false,
  successMsg: null,
  errorMsg: null,
  dropdown: false,
  addOne: {
    hour: set12Hours(dateFns.getHours(new Date())),
    minutes: dateFns.getMinutes(dateFns.addMinutes(new Date(), 15)),
    period: setAMPM(dateFns.getHours(new Date())),
  },
  addBulk: {
    start: {
      hour: set12Hours(dateFns.getHours(dateFns.addMinutes(new Date(), 15))),
      minutes: setMinutes(addMinutes(new Date(), 15)),
      period: setAMPM(new Date().getHours()),
    },
    end: {
      hour: set12Hours(dateFns.getHours(dateFns.addMinutes(new Date(), 75))),
      minutes: dateFns.getMinutes(dateFns.addMinutes(new Date(), 75)),
      period: setAMPM(dateFns.addMinutes(new Date(), 75).getHours()),
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
    case 'setErrorMsg':
      return { ...state, errorMsg: action.payload }
    case 'setSuccessMsg':
      return { ...state, successMsg: action.payload }
    case 'setDropdown':
      return { ...state, dropdown: action.payload }
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
    <Container ref={node} over={state.dropdown}>
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
