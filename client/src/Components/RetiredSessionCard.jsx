import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import { capitalize, noUnderscores } from '../utils/Strings'

const Container = styled.div`
  position: relative;
  z-index: ${props => props.over && 3};
  width: calc(50% - 1rem);
  margin-right: 1rem;
`

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const SessionTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`

const Game = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Price = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Length = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Systems = styled.div`
  margin-bottom: 0.5rem;
`

const SystemTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`

const System = styled.span`
  font-size: 1.7rem;
  font-weight: 400;
`

const Slots = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Type = styled.div`
  margin-bottom: 0.5rem;
`

const TypeTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`

const TypeGame = styled.span`
  font-size: 1.7rem;
  font-weight: 400;
`

const UnretireSession = styled.button`
  margin-top: 1rem;
  background: #db1422;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
`

const initialState = {
  game: '',
  title: '',
  length: '',
  price: '',
  type: '',
  system: '',
  slots: '',
}

function reducer(state, action) {
  switch (action.type) {
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
    case 'setSlots':
      return { ...state, slots: action.payload }
    case 'clearState':
      return { ...initialState }
    default:
      return { ...state }
  }
}

const UNRETIRE_SESSION = gql`
  mutation($input: UnretireSessionInput!) {
    unretireSession(input: $input) {
      unretired
    }
  }
`

export default function RetiredSessionCard({ session, setup, refetch }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const unretireSession = useMutation(UNRETIRE_SESSION)
  useEffect(() => {
    dispatch({ type: 'setTitle', payload: session.title })
    dispatch({ type: 'setGame', payload: session.game.name })
    dispatch({ type: 'setPrice', payload: session.price })
    dispatch({ type: 'setLength', payload: session.length })
    dispatch({ type: 'setSlots', payload: session.slots })
    dispatch({ type: 'setType', payload: session.type })
    dispatch({ type: 'setSystem', payload: session.system })
  }, [])
  return (
    <Container>
      <Card>
        <SessionTitle>{session.title}</SessionTitle>
        <Game>{session.game.name}</Game>
        <Price>{`$${session.price} a slot`}</Price>
        <Length>{`${session.length + setup} minutes a game`}</Length>
        <Systems>
          <SystemTitle>{`System: `}</SystemTitle>
          <System>{`${
            session.system === 'PC'
              ? session.system
              : capitalize(noUnderscores(session.system))
          }`}</System>
        </Systems>
        <Slots>{`${session.slots} slots per game`}</Slots>
        <Type>
          <TypeTitle>{`Type of game: `}</TypeTitle>
          <TypeGame>{`${capitalize(session.type)}`}</TypeGame>
        </Type>
        <UnretireSession
          onClick={async () => {
            const input = { sessionId: session.id }
            const { data } = await unretireSession({ variables: { input } })
            if (data.unretireSession.unretired) {
              refetch()
            }
          }}
        >
          Unretire Session
        </UnretireSession>
      </Card>
    </Container>
  )
}
