import React from 'react'
import dateFns from 'date-fns'

const SessionsSelectedStateContext = React.createContext()
const SessionsSelectedDispatchContext = React.createContext()

const initialState = {
  sessions: [],
  selectedSession: null,
  showModal: false,
  showSelectedSlotsModal: false,
  selectedDay: null,
  sessionToBeAdded: {
    players: 0,
    slots: 0,
    id: null,
    availableSlots: 0,
    selected: [],
    startTime: null,
  },
}

function sessionsReducer(state, action) {
  switch (action.type) {
    case 'ADD_SESSION': {
      return {
        ...state,
        sessions: [...state.sessions, state.sessionToBeAdded],
        sessionToBeAdded: initialState.sessionToBeAdded,
        selectedSession: initialState.selectedSession,
      }
    }
    case 'ADD_SLOTS': {
      const { players } = state.selectedSession

      let selected = []

      for (let i = players.length; i < players.length + action.payload; i++) {
        selected.push(i)
      }
      return {
        ...state,
        sessionToBeAdded: {
          ...state.sessionToBeAdded,
          slots: action.payload,
          selected: action.payload === 0 ? [] : selected,
          players:
            state.sessionToBeAdded.players > 0 && action.payload !== 0
              ? state.sessionToBeAdded.players
              : action.payload === 0
              ? 0
              : 1,
        },
      }
    }
    case 'SHOW_SELECTED_SLOTS_MODAL': {
      return {
        ...state,
        showSelectedSlotsModal: true,
      }
    }
    case 'CLOSE_SELECTED_SLOTS_MODAL': {
      return {
        ...state,
        showSelectedSlotsModal: false,
      }
    }
    case 'FILL_ALL_SLOTS_WITH_FRIENDS': {
      return {
        ...state,
        sessionToBeAdded: {
          ...state.sessionToBeAdded,
          players: state.selectedSession.slots,
          slots: state.selectedSession.slots,
        },
      }
    }
    case 'FILL_ALL_SLOTS_FOR_ME': {
      return {
        ...state,
        sessionToBeAdded: {
          ...state.sessionToBeAdded,
          slots: state.selectedSession.slots,
          players: 1,
        },
      }
    }
    case 'ADD_PLAYERS': {
      const { players } = state.selectedSession
      const { slots: numSlots } = state.sessionToBeAdded

      let selected = []

      if (action.payload > numSlots) {
        for (let i = players.length; i < players.length + action.payload; i++) {
          selected.push(i)
        }
      }
      return action.payload === 0
        ? {
            ...state,
            sessionToBeAdded: {
              ...state.sessionToBeAdded,
              players: action.payload,
              slots: action.payload,
              selected: [],
            },
          }
        : {
            ...state,
            sessionToBeAdded: {
              ...state.sessionToBeAdded,
              players: action.payload,
              selected:
                selected.length > 0
                  ? selected
                  : state.sessionToBeAdded.selected,
              slots:
                action.payload > state.sessionToBeAdded.slots
                  ? action.payload
                  : state.sessionToBeAdded.slots,
            },
          }
    }
    case 'SET_SELECTED_DAY': {
      return {
        ...state,
        selectedDay: action.payload,
      }
    }
    case 'GO_BACK': {
      return {
        ...state,
        selectedSession: null,
      }
    }
    case 'SET_SELECTED_SESSION': {
      return {
        ...state,
        selectedSession: action.payload,
        selectedDay: state.selectedDay
          ? state.selectedDay
          : dateFns.parse(action.payload.startTime),
        sessionToBeAdded: {
          ...state.sessionToBeAdded,
          startTime: action.payload.startTime,
          availableSlots: action.payload.slots - action.payload.players.length,
          id: action.payload.id,
        },
      }
    }
    case 'CLEAR_SELECTED_SESSION': {
      return {
        ...state,
        selectedSession: initialState.selectedSession,
        sessionToBeAdded: initialState.sessionToBeAdded,
      }
    }
    case 'REMOVE_SESSION': {
      return {
        ...state,
        sessions: state.sessions.filter(
          session => session.id !== action.payload
        ),
      }
    }
    case 'CLEAR_STATE': {
      return initialState
    }
    case 'SHOW_MODAL': {
      return {
        ...state,
        showModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        showModal: false,
        selectedDay: null,
        selectedSession: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SessionsProvider({ children }) {
  const [state, dispatch] = React.useReducer(sessionsReducer, initialState)
  return (
    <SessionsSelectedStateContext.Provider value={state}>
      <SessionsSelectedDispatchContext.Provider value={dispatch}>
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
