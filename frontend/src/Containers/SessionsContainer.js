import { Container } from 'unstated'

class SessionsContainer extends Container {
  state = {
    //Picked. Haven't applied to be purchased yet.
    selected: [],
    // Actually about to purchase
    sessions: [],
    system: null,
    selectedSession: null,
    selectedDay: null,
    showModal: false,
    slots: 0,
    players: 0,
    availableSlots: 0,
  }

  /* 
    session : {
      slots: 0,
      timeStart: Date,
      length: 20,
      players: 0,
      
    }
  */

  setSelectedSession = session => {
    session
      ? this.setState({
          selectedSession: session,
          availableSlots: session.slots - session.players.length,
        })
      : this.setState({ selectedSession: session, availableSlots: 0 })
  }

  setSelectedDay = day => {
    this.setState({ selectedDay: day })
  }

  setShowModal = show => {
    this.setState({ showModal: show })
  }

  toggleSelected = selected => {
    this.setState(prevState => {
      const inArray = prevState.selected.includes(selected)
      const newSelected = prevState.selected.filter(
        selection => selection !== selected
      )

      const joinedSelected = [...prevState.selected, selected]

      const players =
        prevState.players === 0
          ? 1
          : newSelected.length === 0
          ? 0
          : prevState.players

      return inArray
        ? { selected: newSelected, slots: newSelected.length, players }
        : { selected: joinedSelected, slots: joinedSelected.length, players }
    })
  }

  setSystem = system => {
    this.setState({ system })
  }

  addSessions = () => {
    this.setState(prevState => ({
      sessions: [...prevState.sessions, ...prevState.selected],
    }))
  }

  clearSelected = () => {
    this.setState({ selected: [] })
  }

  goBack = () => {
    this.setSelectedSession(null)
    this.setNumberOfPlayers(0)
    this.setNumberOfSlots(0)
  }

  setNumberOfSlots = numSlots => {
    const { players, slots, timeStart } = this.state.selectedSession
    const selected = []
    for (
      let i = players.length;
      i < (numSlots < players.length ? slots : numSlots);
      i++
    ) {
      selected.push(`empty${i}-${timeStart}`)
    }
    this.setState(
      prevState => ({
        slots: numSlots,
        selected: numSlots === 0 ? [] : selected,
        players:
          prevState.players === 0 && numSlots >= 1
            ? 1
            : numSlots === 0
            ? 0
            : prevState.players,
      }),
      () => {
        if (numSlots < this.state.players) {
          this.setNumberOfPlayers(numSlots)
        }
      }
    )
  }

  setNumberOfPlayers = numPlayers => {
    this.setState(
      prevState => ({
        players: numPlayers,
        selected: numPlayers === 0 ? [] : prevState.selected,
        slots: numPlayers === 0 ? 0 : prevState.slots,
      }),
      () => {
        if (numPlayers > this.state.slots) {
          this.setNumberOfSlots(numPlayers)
        }
      }
    )
  }

  fillAllSlotsWithMyFriends = () => {
    const { players, slots, timeStart } = this.state.selectedSession
    const selected = []
    const totalPlayers = slots - players.length
    for (let i = players.length; i < slots; i++) {
      selected.push(`empty${i}-${timeStart}`)
    }
    this.setState(prevState => ({
      slots: selected.length,
      selected,
      players: totalPlayers,
    }))
  }

  fillAllSlotsForMe = () => {
    const { players, slots, timeStart } = this.state.selectedSession
    const selected = []
    for (let i = players.length; i < slots; i++) {
      selected.push(`empty${i}-${timeStart}`)
    }
    this.setState(prevState => ({
      slots: selected.length,
      selected,
      players: 1,
    }))
  }
}

export default SessionsContainer
