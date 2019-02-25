import { Container } from 'unstated'

class SessionsContainer extends Container {
  state = {
    //Picked. Haven't applied to be purchased yet.
    selected: [],
    // Actually about to purchase
    sessions: [],
    system: null,
  }

  /* 
    session : {
      
    }
  */

  toggleSelected = selected => {
    this.setState(prevState => {
      const inArray = prevState.selected.includes(selected)
      const newSelected = prevState.selected.filter(
        selection => selection !== selected
      )

      return inArray
        ? { selected: newSelected }
        : { selected: [...prevState.selected, selected] }
    })
  }

  setSystem = system => {
    this.setState({ system })
  }

  addSessions = () => {
    this.setState(prevState => ({
      sessions: [...prevState.sessions, ...prevState.selected],
      selected: [],
    }))
  }
}

export default SessionsContainer
