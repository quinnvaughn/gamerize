import { Container } from 'unstated'

class BecomeAGamerContainer extends Container {
  state = {
    occupation: [],
    addToOccupation: '',
    socialMedia: {
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      twitch: '',
      snapchat: '',
    },
  }

  setOccupation = type => {
    this.setState(prev => {
      const inArray = prev.occupation.includes(type)

      const filteredArray = prev.occupation.filter(item => item !== type)

      return inArray
        ? { occupation: filteredArray }
        : { occupation: [...prev.occupation, type] }
    })
  }

  setSocialMedia = (account, info) => {
    this.setState(prev => {
      return { socialMedia: { ...prev.socialMedia, [account]: String(info) } }
    })
  }
}

let Gamer = new BecomeAGamerContainer()

export default Gamer
