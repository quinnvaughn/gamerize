import React from 'react'
import dateFns from 'date-fns'

const GamerCalendarStateContext = React.createContext()
const GamerCalendarDispatchContext = React.createContext()

const initialState = {
  currentMonth: new Date(),
  selectedDay: new Date(),
}

function gamerCalendarReducer(state, action) {
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
    case 'SET_SELECTED_DAY': {
      return { ...state, selectedDay: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GamerCalendarProvider({ children }) {
  const [state, dispatch] = React.useReducer(gamerCalendarReducer, initialState)
  return (
    <GamerCalendarStateContext.Provider value={state}>
      <GamerCalendarDispatchContext.Provider value={dispatch}>
        {children}
      </GamerCalendarDispatchContext.Provider>
    </GamerCalendarStateContext.Provider>
  )
}

function useGamerCalendarState() {
  const context = React.useContext(GamerCalendarStateContext)
  if (context === undefined) {
    throw new Error(
      'useGamerCalenderState must be used within a GamerCalendarProvider'
    )
  }
  return context
}

function useGamerCalendarDispatch() {
  const context = React.useContext(GamerCalendarDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useGamerCalendarDispatch must be used within a GamerCalendarProvider'
    )
  }
  return context
}

function useGamerCalendar() {
  return [useGamerCalendarState(), useGamerCalendarDispatch()]
}

export { GamerCalendarProvider, useGamerCalendar }
