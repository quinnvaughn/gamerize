import React from 'react'

const BecomeAGamerStateContext = React.createContext()
const BecomeAGamerDispatchContext = React.createContext()

const initialState = {
  occupations: [],
  addToOccupations: '',
  socialMedia: {
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: '',
    twitch: '',
    snapchat: '',
  },
  ownsOwnBankAccount: null,
  age: null,
}

function becomeAGamerReducer(state, action) {
  switch (action.type) {
    case 'SET_OCCUPATIONS': {
      const inArray = state.occupations.includes(action.payload)

      const filteredArray = state.occupations.filter(
        item => item !== action.payload
      )

      return inArray
        ? { ...state, occupations: filteredArray }
        : { ...state, occupations: [...state.occupations, action.payload] }
    }
    case 'SET_SOCIAL_MEDIA': {
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          [action.payload.account]: String(action.payload.info),
        },
      }
    }
    case 'SET_OWNS_BANK_ACCOUNT': {
      return { ...state, ownsOwnBankAccount: action.payload }
    }
    case 'SET_AGE': {
      return { ...state, age: Number(action.payload) }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function BecomeAGamerProvider({ children }) {
  const [state, dispatch] = React.useReducer(becomeAGamerReducer, initialState)
  return (
    <BecomeAGamerStateContext.Provider value={state}>
      <BecomeAGamerDispatchContext.Provider value={dispatch}>
        {children}
      </BecomeAGamerDispatchContext.Provider>
    </BecomeAGamerStateContext.Provider>
  )
}

function useBecomeAGamerState() {
  const context = React.useContext(BecomeAGamerStateContext)
  if (context === undefined) {
    throw new Error(
      'useBecomeAGamerState must be used within a BecomeAGamerProvider'
    )
  }
  return context
}

function useBecomeAGamerDispatch() {
  const context = React.useContext(BecomeAGamerDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useBecomeAGamerDispatch must be used within a BecomeAGamerProvider'
    )
  }
  return context
}

function useBecomeAGamer() {
  return [useBecomeAGamerState(), useBecomeAGamerDispatch()]
}

export { BecomeAGamerProvider, useBecomeAGamer }
