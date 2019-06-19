import React from 'react'
import _ from 'lodash'

const SessionsSelectedStateContext = React.createContext()
const SessionsSelectedDispatchContext = React.createContext()

const initialState = {
  sessions: [],
  selectedSession: {},
  showModal: false,
  selectedDay: null,
  sessionToBeAdded: {},
}

function sessionsReducer(state, action) {
  switch (action.type) {
    case 'ADD_SESSION': {
      return { sessions: [...state.sessions, action.payload] }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SessionsProvider({ children }) {
  const [state, setSessions] = React.useReducer(sessionsReducer, initialState)
  return (
    <SessionsSelectedStateContext.Provider value={state}>
      <SessionsSelectedDispatchContext.Provider value={setSessions}>
        {children}
      </SessionsSelectedDispatchContext.Provider>
    </SessionsSelectedStateContext.Provider>
  )
}

function useSessionsState() {
  const context = React.useContext(SessionsSelectedStateContext)
  if (context === undefined) {
    throw new Error('useSessionState must be used within a SessionsProvider')
  }
  return context
}

function useSessionsDispatch() {
  const context = React.useContext(SessionsSelectedDispatchContext)
  if (context === undefined) {
    throw new Error('useSessionDispatch must be used within a SessionsProvider')
  }
  return context
}

function useSessions() {
  return [useSessionsState(), useSessionsDispatch()]
}

export { SessionsProvider, useSessions }
