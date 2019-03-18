import React, { Fragment, useReducer } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

//local imports

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const GET_SESSIONS = gql`
  {
    me {
      id
      sessions {
        title
        gamers {
          username
        }
        game {
          name
        }
        price
        length
        systems
        slots
        type
      }
    }
  }
`

const initialState = {
  gameName: '',
  title: '',
  length: '',
  price: '',
  type: '',
  systems: [],
  slots: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'setGame':
      return { ...state, gameName: action.payload }
    case 'setTitle':
      return { ...state, title: action.payload }
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
    default:
      return { ...state }
  }
}

export default function GamerDashboardSessions(props) {
  const { data, loading } = useQuery(GET_SESSIONS)
  const [state, dispatch] = useReducer(initialState, reducer)
  return loading ? null : (
    <PageContainer>
      {data.me.sessions.map(session => (
        <Fragment>
          <div>{session.title}</div>
          <div>{session.game.name}</div>
          <div>{session.price}</div>
          <div>{session.length}</div>
          <div>
            {session.systems.map(system => (
              <span>{system}</span>
            ))}
          </div>
          <div>{session.slots}</div>
          <div>{session.type}</div>
        </Fragment>
      ))}
    </PageContainer>
  )
}
