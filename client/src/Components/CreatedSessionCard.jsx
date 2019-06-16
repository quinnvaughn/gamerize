import React, { useReducer } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'

//local imports
import CreatedSessionCardFront from './CreatedSessionCardFront'
import CreatedSessionCardBack from './CreatedSessionCardBack'

const Container = styled.div`
  position: relative;
  width: calc(50% - 1rem);
  margin-right: 1rem;
`

const initialState = {
  flip: false,
  game: '',
  title: '',
  launcher: '',
  length: '',
  price: '',
  type: '',
  system: '',
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
    case 'setSystem':
      return { ...state, system: action.payload }
    case 'setLauncher':
      return { ...state, launcher: action.payload }
    case 'setSlots':
      return { ...state, slots: action.payload }
    case 'clearState':
      return { ...initialState }
    default:
      return { ...state }
  }
}

export default function CreatedSessionCard({ session, setup, refetch, games }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Container>
      <ReactCardFlip isFlipped={state.flip} flipDirection="horizontal">
        <CreatedSessionCardFront
          session={session}
          dispatch={dispatch}
          setup={setup}
          key="front"
        />
        <CreatedSessionCardBack
          games={games}
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
