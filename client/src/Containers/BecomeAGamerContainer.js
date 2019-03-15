import { Container } from 'unstated'

class BecomeAGamerContainer extends Container {
  state = {
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
  }

  setOccupations = type => {
    this.setState(prev => {
      const inArray = prev.occupations.includes(type)

      const filteredArray = prev.occupations.filter(item => item !== type)

      return inArray
        ? { occupations: filteredArray }
        : { occupations: [...prev.occupations, type] }
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
