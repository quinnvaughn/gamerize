import { Container } from 'unstated'
import dateFns from 'date-fns'

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
class SessionAdderContainer extends Container {
  state = initialState

  clearState = () => {
    this.setState(initialState)
  }
  setAddOne = (type, value) => {
    this.setState(prev => ({ addOne: { ...prev.addOne, [type]: value } }))
  }
  clearAddOne = () => {
    this.setState({ addOne: initialState.addOne })
  }
  setAddBulkStart = (type, value) => {
    this.setState(prev => ({
      addBulk: {
        ...prev.addBulk,
        start: { ...prev.addBulk.start, [type]: value },
      },
    }))
  }
  setAddBulkEnd = (type, value) => {
    this.setState(prev => ({
      addBulk: {
        ...prev.addBulk,
        end: { ...prev.addBulk.end, [type]: value },
      },
    }))
  }

  setAddDay = (type, value) => {
    this.setState(prev => ({ addDay: { ...prev.addDay, [type]: value } }))
  }
}

export default SessionAdderContainer
