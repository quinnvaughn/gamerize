import { createStore } from 'react-hookstore'

const initialState = {
  addOne: {
    hour: '--',
    minutes: '--',
    period: '--',
  },
  addBulk: {
    start: {
      hour: '--',
      minutes: '--',
      period: '--',
    },
    end: {
      hour: '--',
      minutes: '--',
      period: '--',
    },
  },
  addDay: {
    month: '--',
    day: '--',
    year: '----',
  },
}

const sessionAdder = createStore(
  'sessionAdder',
  initialState,
  (state, action) => {
    switch (action.type) {
      case 'clearState':
        return { ...initialState }
      case 'setAddOne':
        return {
          ...state,
          addOne: {
            ...state.addOne,
            [action.payload.type]: action.payload.value,
          },
        }
      case 'setAddBulkStart':
        return {
          ...state,
          addBulk: {
            ...state.addBulk,
            start: {
              ...state.addBulk.start,
              [action.payload.type]: action.payload.value,
            },
          },
        }
      case 'setAddBulkEnd':
        return {
          ...state,
          addBulk: {
            ...state.addBulk,
            end: {
              ...state.addBulk.end,
              [action.payload.type]: action.payload.value,
            },
          },
        }
      case 'setAddDay':
        return {
          ...state,
          addDay: {
            ...state.addDay,
            [action.payload.type]: action.payload.value,
          },
        }
      default:
        return {
          ...state,
        }
    }
  }
)

export default sessionAdder
