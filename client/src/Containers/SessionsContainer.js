import { Container } from 'unstated'
import dateFns from 'date-fns'

class SessionsContainer extends Container {
  state = {
    // Actually about to purchase
    sessions: [],
    system: null,
    addedSession: {
      slots: 0,
      players: 0,
      availableSlots: 0,
      timeStart: null,
      selected: [],
    },
    selectedSession: null,
    selectedDay: null,
    showModal: false,
  }
  setSelectedSession = session => {
    session
      ? this.setState(prevState => ({
          addedSession: {
            ...session,
            slots: 0,
            selected: [],
            players: 0,
            availableSlots: session.slots - session.players.length,
          },
          selectedSession: session,
          selectedDay: prevState.selectedDay
            ? prevState.selectedDay
            : new Date(dateFns.parse(session.startTime)),
        }))
      : this.setState(prevState => ({
          selectedSession: session,
          addedSession: { ...prevState.addedSession, availableSlots: 0 },
        }))
  }

  setSelectedDay = day => {
    this.setState({ selectedDay: day })
  }

  setShowModal = show => {
    this.setState({ showModal: show })
  }

  setSystem = system => {
    this.setState({ system })
  }

  addSessions = async () => {
    await this.setState(prevState => ({
      sessions: [...prevState.sessions, prevState.addedSession],
    }))
    this.goBack()
  }

  clearSessions = () => {
    this.setState({ sessions: [] })
  }

  clearAddedSession = () => {
    this.setState({
      addedSession: {
        slots: 0,
        players: 0,
        availableSlots: 0,
        timeStart: null,
        selected: [],
      },
    })
  }

  goBack = async () => {
    await this.setSelectedSession(null)
    await this.clearAddedSession()
  }

  setNumberOfSlots = async numSlots => {
    const { players } = this.state.selectedSession

    const { players: numPlayers } = this.state.addedSession

    let selected = []

    for (let i = players.length; i < players.length + numSlots; i++) {
      selected.push(i)
    }

    await this.setState(prevState => ({
      addedSession: {
        ...prevState.addedSession,
        slots: numSlots,
        selected: numSlots === 0 ? [] : selected,
        players: numPlayers === 0 ? 1 : numPlayers,
      },
    }))
    if (numPlayers > numSlots) {
      this.setNumberOfPlayers(numSlots)
    }
  }

  setNumberOfPlayers = async numPlayers => {
    const { players } = this.state.selectedSession
    const { slots: numSlots } = this.state.addedSession

    let selected = []

    if (numPlayers > numSlots) {
      for (let i = players.length; i < players.length + numPlayers; i++) {
        selected.push(i)
      }
    }

    await this.setState(prevState => ({
      addedSession: {
        ...prevState.addedSession,
        players: numPlayers,
        selected:
          numPlayers === 0
            ? []
            : selected.length > 0
            ? selected
            : prevState.addedSession.selected,
        slots:
          numPlayers === 0
            ? 0
            : numPlayers > prevState.addedSession.slots
            ? numPlayers
            : prevState.addedSession.slots,
      },
    }))
  }

  fillAllSlotsWithMyFriends = () => {
    const { players, slots } = this.state.selectedSession
    const selected = []
    const totalPlayers = slots - players.length
    for (let i = players.length; i < slots; i++) {
      selected.push(i)
    }
    this.setState(prevState => ({
      addedSession: {
        ...prevState.addedSession,
        slots: selected.length,
        selected,
        players: totalPlayers,
      },
    }))
  }

  fillAllSlotsForMe = () => {
    const { players, slots } = this.state.selectedSession
    const selected = []
    for (let i = players.length; i < slots; i++) {
      selected.push(i)
    }
    this.setState(prevState => ({
      addedSession: {
        ...prevState.addedSession,
        slots: selected.length,
        selected,
        players: 1,
      },
    }))
  }
}

export default SessionsContainer
