import React, { useReducer, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'

//local imports
import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import CreatedSessionCardFront from './CreatedSessionCardFront'
import CreatedSessionCardBack from './CreatedSessionCardBack'

const Container = styled.div`
  position: relative;
  z-index: ${props => props.over && 3};
  width: calc(50% - 1rem);
  margin-right: 1rem;
`

const initialState = {
  flip: false,
  game: '',
  title: '',
  length: '',
  price: '',
  type: '',
  systems: [],
  slots: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'flip':
      return { ...state, flip: action.payload }
    case 'setGame':
      return { ...state, game: action.payload }
    case 'setTitle':
      return { ...state, title: action.payload }
    case 'setPrice':
      return { ...state, price: action.payload }
    case 'setLength':
      return { ...state, length: action.payload }
    case 'setType':
      return { ...state, type: action.payload }
    case 'setSystems':
      const index = state.systems.indexOf(action.payload)
      if (index === -1) {
        return {
          ...state,
          systems: [...state.systems, action.payload],
        }
      } else {
        return {
          ...state,
          systems: state.systems.filter(system => system !== action.payload),
        }
      }
    case 'setSlots':
      return { ...state, slots: action.payload }
    case 'clearState':
      return { ...initialState }
    default:
      return { ...state }
  }
}

export default function CreatedSessionCard({ session, buffer, refetch }) {
  const node = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearAndFlip = () => {
    dispatch({ type: 'flip', payload: false })
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
        <CreatedSessionCardFront
          session={session}
          dispatch={dispatch}
          buffer={buffer}
          key="front"
        />
        <CreatedSessionCardBack
          session={session}
          dispatch={dispatch}
          state={state}
          refetch={refetch}
          key="back"
        />
      </ReactCardFlip>
    </Container>
  )
}
