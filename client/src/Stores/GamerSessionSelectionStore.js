import { createStore } from 'react-hookstore'

const initialState = {
  selectedSession: null,
}

const gamerSessionSelection = createStore(
  'gamerSessionSelection',
  initialState,
  (state, action) => {
    switch (action.type) {
      case 'setSelectedSession':
        return { ...state, selectedSession: action.payload }
      default:
        return {
          ...state,
        }
    }
  }
)

export default gamerSessionSelection
