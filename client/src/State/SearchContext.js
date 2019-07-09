import React from 'react'

const SearchStateContext = React.createContext()
const SearchDispatchContext = React.createContext()

const initialState = {
  text: '',
  type: 'NULL',
  systems: [],
}

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_TEXT': {
      return { ...state, text: action.payload }
    }
    case 'CLEAR_TEXT': {
      return { ...state, text: '' }
    }
    case 'SET_TYPE': {
      return { ...state, type: action.payload }
    }
    case 'SET_SYSTEMS': {
      return {
        ...state,
        systems: Object.entries(action.payload)
          .filter(f => f[1] === true)
          .map(result => result[0]),
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SearchProvider({ children }) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

function useSearchState() {
  const context = React.useContext(SearchStateContext)
  if (context === undefined) {
    throw new Error('useSearchtate must be used within a SearchProvider')
  }
  return context
}

function useSearchDispatch() {
  const context = React.useContext(SearchDispatchContext)
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a SearchProvider')
  }
  return context
}

function useSearch() {
  return [useSearchState(), useSearchDispatch()]
}

export { SearchProvider, useSearch }
