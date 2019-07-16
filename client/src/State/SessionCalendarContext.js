import React from 'react'
import dateFns from 'date-fns'

const SessionCalendarStateContext = React.createContext()
const SessionCalendarDispatchContext = React.createContext()

const initialState = {
  currentMonth: new Date(),
  currentDay: new Date(),
}

function sessionCalendarReducer(state, action) {
  switch (action.type) {
    case 'NEXT_MONTH': {
      return {
        ...state,
        currentMonth: dateFns.addMonths(state.currentMonth, 1),
      }
    }
    case 'PREVIOUS_MONTH': {
      return {
        ...state,
        currentMonth: dateFns.subMonths(state.currentMonth, 1),
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SessionCalendarProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    sessionCalendarReducer,
    initialState
  )
  return (
    <SessionCalendarStateContext.Provider value={state}>
      <SessionCalendarDispatchContext.Provider value={dispatch}>
        {children}
      </SessionCalendarDispatchContext.Provider>
    </SessionCalendarStateContext.Provider>
  )
}

function useSessionCalendarState() {
  const context = React.useContext(SessionCalendarStateContext)
  if (context === undefined) {
    throw new Error(
      'useSessionCalendarState must be used within a SessionCalendarProvider'
    )
  }
  return context
}

function useSessionCalendarDispatch() {
  const context = React.useContext(SessionCalendarDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useSessionCalendarDispatch must be used within a SessionCalendarProvider'
    )
  }
  return context
}

function useSessionCalendar() {
  return [useSessionCalendarState(), useSessionCalendarDispatch()]
}

export { SessionCalendarProvider, useSessionCalendar }
