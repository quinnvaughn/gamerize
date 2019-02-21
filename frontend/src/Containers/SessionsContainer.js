import { Container } from 'unstated'

class SessionsContainer extends Container {
  state = {
    selected: [],
    players: 1,
  }
  handleClick = selected => {
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
}

export default SessionsContainer
