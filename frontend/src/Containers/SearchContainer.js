import { Container } from 'unstated'

class SearchContainer extends Container {
  state = {
    keyword: '',
    game: '',
  }
  updateKeyword(event) {
    this.setState({ keyword: event.target.value })
  }
  updateGame(game) {
    this.setState({ game })
  }
}

export default SearchContainer
